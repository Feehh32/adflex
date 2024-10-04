const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { format, parse } = require("date-fns");
const { ptBR } = require("date-fns/locale");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// Função para transformar a data
function transformDate(dateString) {
  try {
    const parsedDate = parse(
      dateString.trim(),
      "EEEE dd 'de' MMMM 'de' yyyy",
      new Date(),
      { locale: ptBR }
    );
    if (isNaN(parsedDate)) {
      throw new Error(`Data inválida: ${dateString}`);
    }
    return format(parsedDate, "dd-MM-yyyy");
  } catch (error) {
    console.error(`Erro ao transformar a data: ${dateString}`, error);
    return dateString; // Retorna a data original em caso de erro
  }
}

// Ler o CSV mesclado e transformar as datas
function processCSV(inputFile, outputFile) {
  const results = [];

  fs.createReadStream(inputFile)
    .pipe(csv())
    .on("data", (data) => {
      try {
        // Transformar a data
        data.date = transformDate(data.date);
        results.push(data);
      } catch (error) {
        console.error(
          `Erro ao processar linha: ${JSON.stringify(data)}`,
          error
        );
      }
    })
    .on("end", () => {
      // Escrever os dados transformados em um novo arquivo CSV
      const csvWriter = createCsvWriter({
        path: outputFile,
        header: Object.keys(results[0]).map((key) => ({ id: key, title: key })),
      });

      csvWriter.writeRecords(results).then(() => {
        console.log("CSV com datas transformadas foi salvo em", outputFile);
      });
    });
}

// Definir caminhos para os arquivos de entrada e saída
const inputFilePath = path.join(__dirname, "service_notes.csv");
const outputFilePath = path.join(__dirname, "output.csv");

// Processar o CSVc
processCSV(inputFilePath, outputFilePath);
