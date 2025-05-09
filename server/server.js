const express = require("express");
const path = require("path");
const { app: appElectron } = require("electron");
const cors = require("cors");

const app = express();
const appPath = appElectron.getPath("userData");
const envPath = path.join(appPath, ".env");

require("dotenv").config({ path: envPath });
const supabase = require("./supabaseClient.js");

const port = 3000;

function initServer(electronApp) {
  app.use(cors());
  app.use(express.json());
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });

  // ================= Requisições GET ====================

  // Buscando clientes no banco de dados
  app.get("/clients", async (req, res) => {
    try {
      const { data, error } = await supabase.from("clients").select("*");
      if (error) throw error;
      res.json({ clients: data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Buscando a quantidade de notas de serviço inseridas no banco de dados para cada cliente
  app.get("/os/amount", async (req, res) => {
    try {
      const { data, error } = await supabase.rpc("counting_os");

      if (error) throw error;
      res.json({ osAmount: data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Buscando as informações da nota de serviço no banco de dados
  // Função referente a requisição GET de service_details

  app.get("/service_details/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const query = supabase
        .from("service_details")
        .select("*")
        .eq("note_id", id)
        .order("serviceName", { ascending: true });

      const { data: serviceDetails, error } = await query;
      if (error) throw error;
      res.json({ data: serviceDetails });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Buscando todas as os e os serviços baseados na date e no client_id
  app.get("/os/by-date-id/:date/:id", async (req, res) => {
    try {
      const { date, id } = req.params;
      const { data, error } = await supabase
        .from("service_notes")
        .select("*")
        .ilike("date", `%${date}%`)
        .eq("client_id", id);

      if (error) throw error;
      res.json({ os: data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Buscando todas as os e os serviços por um determinado mês e ano no banco de dados
  app.get("/os/by-month-year/:month/:year", async (req, res) => {
    try {
      const { month, year } = req.params;
      const { data, error } = await supabase.rpc("get_monthly_balance", {
        month_year: `${month}-${year}`,
      });

      if (error) throw error;
      res.json({ os: data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Buscando todas as os baseadas no id do client
  app.get("/os/by-id/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { data, error } = await supabase.from("service_notes").select("*").eq("client_id", id);

      if (error) throw error;
      res.json({ os: data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Buscando uma os específica baseado no id da mesma
  app.get("/os/byOs-id/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { data, error } = await supabase.from("service_notes").select("*").eq("id", id);

      if (error) throw error;
      res.json({ os: data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Buscando uma os específica baseado no id da mesma
  app.get("/os/by-clientName/:clientName", async (req, res) => {
    try {
      const { clientName } = req.params;
      const { data, error } = await supabase
        .from("service_notes")
        .select("*")
        .eq("client", clientName)
        .order("id", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      res.json({ os: data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // ================= Métodos de POST ====================

  // Inserindo um cliente no banco de dados

  app.post("/clients", async (req, res, next) => {
    const { name, email1, email2, tel1, tel2, charge } = req.body.clients;
    try {
      const { data: existingClient, error } = await supabase
        .from("clients")
        .select("*")
        .ilike("name", `%${name.toLowerCase()}%`);
      if (error) throw error;

      if (existingClient.length > 0) {
        return res.status(409).json({
          error: "Client já existe. Por favor, verifique as informações e tente novamente.",
        });
      }

      const { data: newClient, error: insertError } = await supabase
        .from("clients")
        .insert([
          {
            name,
            email1,
            email2,
            tel1,
            tel2,
            charge,
          },
        ])
        .select();

      if (insertError) throw insertError;

      if (newClient && newClient.length) {
        res.json({ id: newClient[0].id });
      } else {
        res.status(500).json({ error: "Falha ao inserir novo cliente." });
      }
    } catch (err) {
      next(err.message);
    }
  });

  // Inserir notas de serviço no banco de dados,
  // com base nos clientes descritos na nota
  app.post("/os", async (req, res) => {
    if (!req.body || !req.body.os) {
      return res.status(400).json({ error: "Corpo da solicitação inválido" });
    }

    const { client, hideMeasure, thickness, service, date, total, code, budgetValue } = req.body.os;

    const thicknessValue = thickness ? Number(thickness) : null;
    // Recuperando o ID do cliente segundo a nota de serviço
    try {
      const { data: clientData, error: clientIdError } = await supabase
        .from("clients")
        .select("id")
        .ilike("name", `%${client}%`);

      if (clientIdError) throw clientIdError;

      if (clientData.length === 0) {
        return res.status(404).json({ error: "Cliente não encontrado." });
      }

      const clientId = clientData[0].id;

      const { data: newNoteService, error: noteServiceError } = await supabase
        .from("service_notes")
        .insert([
          {
            client,
            client_id: clientId,
            hideMeasure,
            thickness: thicknessValue,
            date,
            total,
            code,
            budgetValue,
          },
        ])
        .select()
        .single();

      if (noteServiceError) throw noteServiceError;
      if (newNoteService) {
        const noteId = newNoteService.id;

        const servicePromise = service.map(async (info) => {
          const result = await supabase
            .from("service_details")
            .insert([
              {
                note_id: noteId,
                serviceName: info.serviceName,
                serviceAmount: info.serviceAmount,
                width: info.width,
                height: info.height,
                serviceValue: info.serviceValue,
              },
            ])
            .select();

          if (result.error) {
            console.error("Erro ao inserir detalhe do serviço:", result.error);
            return result;
          }

          return result;
        });

        const serviceResults = await Promise.all(servicePromise);
        const serviceErrors = serviceResults.filter((result) => result.error);

        if (serviceErrors.length > 0) {
          return res.status(500).json({ error: "Falhas ao inserir detalhes do serviço." });
        }
        res.json({ message: "Nota de serviço inseridos com sucesso.", noteId });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // ================= Requisições PUT ====================

  // Atualizando ou alterando os dados do client cadastrado baseado no ID do mesmo
  app.put("/clients/:id", async (req, res) => {
    const clientId = parseInt(req.params.id, 10);
    const { name, email1, email2, tel1, tel2, charge } = req.body;
    try {
      const { data, error } = await supabase
        .from("clients")
        .update({
          name,
          email1,
          email2,
          tel1,
          tel2,
          charge,
        })
        .eq("id", clientId)
        .select();

      if (error) throw error;

      if (data.length === 0) {
        return res.status(404).json({ error: "Cliente não encontrado." });
      }

      res.json({ message: "Cliente atualizado com sucesso", client: data[0] });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

  // Editando a data na os
  app.put("/os/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ error: "Campo 'date' é obrigatório." });
    }

    try {
      const { data: currentData, error: currentError } = await supabase
        .from("service_notes")
        .select("client")
        .eq("id", id)
        .maybeSingle();

      if (currentError || !currentData) {
        return res.status(404).json({ error: "OS não encontrada para atualização." });
      }

      const clientName = currentData.client;

      const [, month, year] = date.split("-");

      const { data: existingCodes, error: codeError } = await supabase
        .from("service_notes")
        .select("code")
        .ilike("client", clientName)
        .ilike("date", `%-${month}-${year}-%`)
        .order("code", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (codeError) throw codeError;

      let nextCode = "001";
      if (existingCodes?.code) {
        const lastCodeNum = parseInt(existingCodes.code, 10);
        nextCode = String(lastCodeNum + 1).padStart(3, "0");
      }

      const { data: updatedData, error: updateError } = await supabase
        .from("service_notes")
        .update({ date, code: nextCode })
        .eq("id", id)
        .select()
        .maybeSingle();

      if (updateError) throw updateError;

      return res.json({
        message: "Data e código atualizados com sucesso",
        updatedNote: updatedData,
      });
    } catch (err) {
      console.error("Erro inesperado no catch:", err);
      return res.status(500).json({ error: "Erro inesperado no servidor." });
    }
  });

  // ================= Requisições DELETE ====================

  // Deletando um cliente
  app.delete("/clients/:id", async (req, res) => {
    const clientId = parseInt(req.params.id, 10);

    try {
      const { data: serviceNotes, error: serviceNotesError } = await supabase
        .from("service_notes")
        .select("id")
        .eq("client_id", clientId);

      if (serviceNotesError) throw serviceNotesError;

      const serviceNotesIds = serviceNotes.map((note) => Number(note.id));

      // Deletar todos os detalhes de serviço relacionado as notas de serviço do cliente
      if (serviceNotesIds.length > 0) {
        const { error: serviceDetailsError } = await supabase
          .from("service_details")
          .delete()
          .in("note_id", serviceNotesIds);

        if (serviceDetailsError) throw serviceDetailsError;

        // Deletar todas as notas de serviço do cliente
        const { error: serviceNotesDltError } = await supabase
          .from("service_notes")
          .delete()
          .in("id", serviceNotesIds);

        if (serviceNotesDltError) throw serviceNotesDltError;
      }

      // Deletar o cliente
      const { error: clientDltError } = await supabase.from("clients").delete().eq("id", clientId);

      if (clientDltError) throw clientDltError;

      res.json({ message: "O cliente e suas notas foram deletados com sucesso." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Deletar as notas de serviço

  app.delete("/os/:id", async (req, res) => {
    const noteId = parseInt(req.params.id, 10);

    try {
      if (noteId) {
        const { data: serviceDetails, error: detailsError } = await supabase
          .from("service_details")
          .select("id")
          .eq("note_id", noteId);

        if (detailsError) throw detailsError;

        const servicesId = serviceDetails.map((service) => service.id);

        const { error: serviceErrDelete } = await supabase
          .from("service_details")
          .delete()
          .in("id", servicesId);

        if (serviceErrDelete) throw serviceErrDelete;

        const { data: clientIdData, error: noteError } = await supabase
          .from("service_notes")
          .select("client_id")
          .eq("id", noteId);

        if (noteError) throw noteError;

        const clientId = clientIdData.length > 0 ? clientIdData[0].client_id : null;

        const { error: noteErrDelete } = await supabase
          .from("service_notes")
          .delete()
          .eq("id", noteId);

        if (noteErrDelete) throw noteErrDelete;

        if (clientId !== null) {
          res.json({ clientId });
        }
      } else {
        res.status(404).json({ error: "Nota de serviço não encontrada." });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}

module.exports = initServer;
