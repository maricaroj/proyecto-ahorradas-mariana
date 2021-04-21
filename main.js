const burgerMenu = document.getElementById("navbar-burger");
const btnBalance = document.getElementById("btn-balance");
const btnCategories = document.getElementById("btn-categories");
const btnReports = document.getElementById("btn-reports");
const btnNewOperation = document.getElementById("btn-new-operation");
const btnShowFilters = document.getElementById("btn-show-filters");
const btnHideFilters = document.getElementById("btn-hide-filters");
const btnCancelOperation = document.getElementById("btn-cancel-operation");
const btnAddOperation = document.getElementById("btn-add-operation");

const navbarBasicExample = document.getElementById("navbarBasicExample");
const formOperation = document.getElementById("form-operation");
const balanceSection = document.getElementById("balance-section");
const categoriesSection = document.getElementById("categories-section");
const operationsList = document.getElementById("operations-list");
const addNewOperation = document.getElementById("add-new-operation");
const withoutOperations = document.getElementById("without-operations");
const reportsSection = document.getElementById("reports-section");
const operationDate = document.getElementById("operation-date");
const operationDescription = document.getElementById("operation-description");
const operationAmount = document.getElementById("operation-amount");
const operationType = document.getElementById("operation-type");
const operationCategories = document.getElementById("operation-categories");
const filtersContainer = document.getElementById("filters");
const filtersDate = document.getElementById("filters-date");
const filtersType = document.getElementById("filters-type");
const filtersCategories = document.getElementById("filters-categories");
const filtersOrder = document.getElementById("filters-order");

btnBalance.addEventListener("click", () => {
  categoriesSection.classList.add("is-hidden");
  reportsSection.classList.add("is-hidden");
  formOperation.classList.add("is-hidden");
  editCategorySection.classList.add("is-hidden");
  balanceSection.classList.remove("is-hidden");
});

btnCategories.addEventListener("click", () => {
  balanceSection.classList.add("is-hidden");
  reportsSection.classList.add("is-hidden");
  formOperation.classList.add("is-hidden");
  editCategorySection.classList.add("is-hidden");
  categoriesSection.classList.remove("is-hidden");
});

btnReports.addEventListener("click", () => {
  balanceSection.classList.add("is-hidden");
  categoriesSection.classList.add("is-hidden");
  formOperation.classList.add("is-hidden");
  editCategorySection.classList.add("is-hidden");
  reportsSection.classList.remove("is-hidden");
});

// MENU HAMBURGUESA
burgerMenu.addEventListener("click", () => {
  burgerMenu.classList.toggle("is-active");
  navbarBasicExample.classList.toggle("is-active");
});

// FECHAS
const date = () => {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
};

filtersDate.value = date();
operationDate.value = date();

// NUEVA OPERACION Y CANCELAR
btnNewOperation.addEventListener("click", () => {
  balanceSection.classList.add("is-hidden");
  formOperation.classList.remove("is-hidden");
});

btnCancelOperation.addEventListener("click", () => {
  formOperation.classList.add("is-hidden");
  balanceSection.classList.remove("is-hidden");
});

// MOSTRAR Y OCULTAR FILTROS
btnHideFilters.addEventListener("click", () => {
  filtersContainer.classList.add("is-hidden");
  btnHideFilters.classList.add("is-hidden");
  btnShowFilters.classList.remove("is-hidden");
});
btnShowFilters.addEventListener("click", () => {
  filtersContainer.classList.remove("is-hidden");
  btnHideFilters.classList.remove("is-hidden");
  btnShowFilters.classList.add("is-hidden");
});

// FUNCION NUEVA OPERACION

let categories = [
  { id: 1, nombre: "Comida" },
  { id: 2, nombre: "Educacion" },
  { id: 3, nombre: "Salidas" },
  { id: 4, nombre: "Servcios" },
  { id: 5, nombre: "Trabajo" },
  { id: 6, nombre: "Transporte" },
];

const resetFormOperation = () => {
  operationDescription.value = "";
  operationAmount.value = 0;
  operationType.value = "Gasto";
  operationCategories.value = categories[0].nombre;
  operationDate.value = date();
};

const checkOperations = (arrOperaciones) => {
  if (arrOperaciones.length === 0) {
    operationsList.classList.add("is-hidden");
    withoutOperations.classList.remove("is-hidden");
  } else {
    withoutOperations.classList.add("is-hidden");
    operationsList.classList.remove("is-hidden");
  }
};

let operations = [];

btnAddOperation.addEventListener("click", () => {
  const newOperation = {
    id: uuid.v4(),
    descripcion: operationDescription.value,
    monto: parseInt(operationAmount.value),
    tipo: operationType.value,
    categoria: operationCategories.value,
    fecha: operationDate.value,
  };

  operations.push(newOperation);
  localStorage.setItem("operacionesStorage", JSON.stringify(operations));
  const getOperacionesStorage = JSON.parse(
    localStorage.getItem("operacionesStorage")
  );

  resetFormOperation();
  operationsHtml(getOperacionesStorage);

  formOperation.classList.add("is-hidden");
  balanceSection.classList.remove("is-hidden");
});

const operationsHtml = (operations) => {
  checkOperations(operations);
  addNewOperation.innerHTML = "";
  for (let i = 0; i < operations.length; i++) {
    const monto =
      operations[i].tipo === "Ganancia"
        ? `+$${operations[i].monto}`
        : `-$${operations[i].monto}`;
    const color =
      operations[i].tipo === "Ganancia"
        ? "has-text-success"
        : "has-text-danger";

    const box = `
    <div id="${operations[i].id}" class="columns m-0">
      <div class="column is-size-6 is-3">${operations[i].descripcion}</div>
      <div class="column is-size-7 is-2 has-text-centered"><span class="has-background-info-dark has-text-white radius p-1">${operations[i].categoria}</span></div>
      <div class="column is-size-6 is-3 has-text-centered">${operations[i].fecha}</div>
      <div class="column is-size-6 is-2 has-text-centered has-text-weight-bold ${color}">${monto}</div>
      <div class="column is-2 px-0">
        <a href="#" class="is-size-7 mr-2">Editar</a>
        <a href="#" class="is-size-7">Eliminar</>
      </div>
    </div>
    `;
    addNewOperation.insertAdjacentHTML("beforeend", box);
  }
};

operations =
  JSON.parse(localStorage.getItem("operacionesStorage")) ?? operations;
operationsHtml(operations);
checkOperations(operations);

// EDITAR OPERACION

const btnEditOperation = document.getElementById("btn-edit-operation");
const operationEditDescription = document.getElementById("operation-edit-description");
const operationEditAmount = document.getElementById("operation-edit-amount");
const operationEditType = document.getElementById("operation-edit-type");
const operationEditDate = document.getElementById("operation-edit-date");
const operationEditCategories = document.getElementById("operation-edit-categories");

// CATEGORIAS
const inputCategories = document.getElementById("category-name");
const categoriesList = document.getElementById("categories-list");
const btnAddCategory = document.getElementById("btn-add-category");
const btnEditCategory = document.getElementById("btn-edit-category");

const editCategorySection = document.getElementById("edit-category-section");
const inputEditCategory = document.getElementById("edit-category-name");



// AGREGAR NUEVA CATEGORIA

btnAddCategory.addEventListener("click", () => {
  const newCategory = inputCategories.value;
  categories.push({ id: categories.length, nombre: newCategory });

  localStorage.setItem("categoriasStorage", JSON.stringify(categories));
  const getCategoriesStorage = JSON.parse(
    localStorage.getItem("categoriasStorage")
  );
  categoriesHTML(getCategoriesStorage);
  categoriesSelect(getCategoriesStorage);
  inputCategories.value = "";
});

const hideSectionsEdit = () => {
  categoriesSection.classList.add("is-hidden");
  reportsSection.classList.add("is-hidden");
  formOperation.classList.add("is-hidden");
  balanceSection.classList.add("is-hidden");
  editCategorySection.classList.remove("is-hidden");
};

const hideEditSection = () => {
  categoriesSection.classList.remove("is-hidden");
  reportsSection.classList.add("is-hidden");
  formOperation.classList.add("is-hidden");
  balanceSection.classList.add("is-hidden");
  editCategorySection.classList.add("is-hidden");
};

// EDITAR UNA CATEGORIA
let index;
const editCategory = (category) => {
  hideSectionsEdit();
  index = categories.findIndex((elem) => elem.id === Number(category));
  inputEditCategory.value = categories[index].nombre
  return index
};

btnEditCategory.addEventListener("click", () => {
  const newValue = inputEditCategory.value
  categories[index].nombre = newValue;
  localStorage.setItem("categoriasStorage", JSON.stringify(categories));
  categoriesHTML(categories);
  categoriesSelect(categories);

  hideEditSection();
});

// ELIMINAR UNA CATEGORIA

const deleteCategory = (category) => {
  const categoryName = categories.find((elem) => elem.id == category);

  const value = categories.findIndex((elem) => elem.id == category);
  if (value >= 0) {
    categories.splice(value, 1);
    localStorage.setItem("categoriasStorage", JSON.stringify(categories));
    categoriesHTML(categories);
    categoriesSelect(categories);
  }
  // operations.forEach(() => {
  //   const index = operations.findIndex(
  //     (operation) => operation.categoria === categoryName.nombre
  //   );
  //   if (index >= 0) {
  //     operations.splice(index, 1);
  //   }
  //   operationsHtml(operations);
  // });
};

// PINTAR SECCION
const categoriesHTML = (categories) => {
  categoriesList.innerHTML = "";
  for (let i = 0; i < categories.length; i++) {
    const categoria = `
    <div class="columns m-0 is-10 is-offset-2 is-justify-content-space-between">
      <div class="column is-size-7 is-10"><span class="has-background-info-dark has-text-white radius p-1">${categories[i].nombre}</span></div>
      <div class="column is-2 px-0">
        <a href="#" class="is-size-7 mr-2" onclick="editCategory('${categories[i].id}')" >Editar</a>
        <a href="#" class="is-size-7" onclick="deleteCategory('${categories[i].id}')">Eliminar</a>
      </div>
    </div>
    `;
    categoriesList.insertAdjacentHTML("beforeend", categoria);
  }
};

// PINTAR EN LOS SELECT

const categoriesSelect = (categories) => {
  operationCategories.innerHTML = "";
  filtersCategories.innerHTML = `<option value="Todas">Todas</option>`;
  for (let i = 0; i < categories.length; i++) {
    const categoria = `
    <option value="${categories[i].nombre}">${categories[i].nombre}</option>
    `;
    operationCategories.insertAdjacentHTML("beforeend", categoria);
    filtersCategories.insertAdjacentHTML("beforeend", categoria);
  }
};

categories =
  JSON.parse(localStorage.getItem("categoriasStorage")) ?? categories;
categoriesHTML(categories);
categoriesSelect(categories);

// FILTROS
const filtrar = (e) => {
  let atr = "";
  if (e.target.id === "filters-type") {
    atr = "tipo";
  }
  if (e.target.id === "filters-categories") {
    atr = "categoria";
  }
  let resultado = [];
  if (resultado.length > 0) {
    resultado = resultado.filter(
      (operation) => operation[atr] === e.target.value
    );
  } else {
    resultado = operations.filter(
      (operation) => operation[atr] === e.target.value
    );
  }

  e.target.value === "Todas"
    ? operationsHtml(operations)
    : operationsHtml(resultado);
};

filtersType.addEventListener("change", (e) => {
  filtrar(e);
});
filtersCategories.addEventListener("change", (e) => {
  filtrar(e);
});
