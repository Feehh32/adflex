import MenuMobile from "./modules/global/menu_mobile.js";
import SearchClient from "./modules/index/search_clients.js";
import ShowClientsIndex from "./modules/index/show_clients_index.js";
import ClientPage from "./modules/client/client_page.js";
import ClientOs from "./modules/client/client_os.js";
import FormClient from "./modules/client/form_client.js";
import FormOs from "./modules/client/form_os.js";
import OsPage from "./modules/osPage/os_page.js";
import MonthSales from "./modules/month_sales/month_sales.js";

// requisições fetch
import ApiService from "./modules/helpers/api_service.js";

const url = "http://localhost:3000";

const apiServices = new ApiService(url);

const clients = await apiServices.get("clients").then((data) => data.clients);
const os = await apiServices.get("os").then((data) => data.os);

// Animação;
if (window.SimpleAnime) {
  // eslint-disable-next-line no-new, no-undef
  new SimpleAnime();
}

// instancias de classes da aplicação
const menuMobile = new MenuMobile("[data-btn-menu]", '[data-menu="list"]', "click");
menuMobile.init();

const searchClient = new SearchClient(
  "[data-search]",
  "[data-btnSearch]",
  '[data-input="suggestion"]',
  "[data-wrapper]",
  clients
);
searchClient.init();

const showClientsIndex = new ShowClientsIndex("[data-wrapper]", clients, os);
showClientsIndex.init();

const clientPage = new ClientPage(
  '[data-name="client"]',
  '[data-info="client"]',
  '[data-action="delete-client"]',
  '[data-action="send-mail"]',
  clients,
  url
);
clientPage.init();

const clientOs = new ClientOs(
  '[data-os="wrapper"]',
  "[data-osSearch]",
  '[data-os="ver-mais"]',
  '[data-os="ver-menos"]',
  os,
  clientPage.client
);
clientOs.init();

const formClient = new FormClient("[data-form]", "[data-field]", clientPage.client, url);
formClient.init();

const formOs = new FormOs(
  "[data-formOs]",
  "[data-btnServiceAmount]",
  "[data-serviceItem]",
  clients,
  os,
  url
);
formOs.init();

const osPage = new OsPage(os, "[data-titleOs] span", "[data-os]", "[data-buttonOs]", url);
osPage.init();

const monthSales = new MonthSales(
  "[data-form-sales]",
  "[data-sales-wrapper]",
  "[data-sale-btn]",
  clients,
  os
);
monthSales.init();
