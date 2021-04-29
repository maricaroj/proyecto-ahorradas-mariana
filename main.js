const burgerMenu = document.getElementById("navbar-burger");
const btnBalance = document.getElementById("btn-balance");
const btnCategories = document.getElementById("btn-categories");
const btnReports = document.getElementById("btn-reports");
const btnNewOperation = document.getElementById("btn-new-operation");
const btnShowFilters = document.getElementById("btn-show-filters");
const btnHideFilters = document.getElementById("btn-hide-filters");
const btnCancelOperation = document.getElementById("btn-cancel-operation");
const btnAddOperation = document.getElementById("btn-add-operation");
const btnAddCategory = document.getElementById("btn-add-category");
const btnEditCategory = document.getElementById("btn-edit-category");
const btnEditOperation = document.getElementById("btn-edit-operation");


const navbarBasicExample = document.getElementById("navbarBasicExample");
const formOperation = document.getElementById("form-operation");
const balanceSection = document.getElementById("balance-section");
const balanceGanancia = document.getElementById("balance-ganancias");
const balanceGasto = document.getElementById("balance-gastos");
const balanceTotal = document.getElementById("balance-total");
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
const formEditOperation = document.getElementById("form-edit-operation");
const inputCategories = document.getElementById("category-name");
const categoriesList = document.getElementById("categories-list");
const editCategorySection = document.getElementById("edit-category-section");
const inputEditCategory = document.getElementById("edit-category-name");
const operationEditDescription = document.getElementById("operation-edit-description");
const operationEditAmount = document.getElementById("operation-edit-amount");
const operationEditType = document.getElementById("operation-edit-type");
const operationEditDate = document.getElementById("operation-edit-date");
const operationEditCategories = document.getElementById("operation-edit-categories");


btnBalance.addEventListener("click", () => {
  categoriesSection.classList.add("is-hidden");
  reportsSection.classList.add("is-hidden");
  formOperation.classList.add("is-hidden");
  formEditOperation.classList.add("is-hidden");
  editCategorySection.classList.add("is-hidden");
  balanceSection.classList.remove("is-hidden");
});

btnCategories.addEventListener("click", () => {
  balanceSection.classList.add("is-hidden");
  reportsSection.classList.add("is-hidden");
  formOperation.classList.add("is-hidden");
  formEditOperation.classList.add("is-hidden");
  editCategorySection.classList.add("is-hidden");
  categoriesSection.classList.remove("is-hidden");
});

btnReports.addEventListener("click", () => {
  balanceSection.classList.add("is-hidden");
  categoriesSection.classList.add("is-hidden");
  formOperation.classList.add("is-hidden");
  formEditOperation.classList.add("is-hidden");
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
  { id: uuid.v4(), nombre: "Comida" },
  { id: uuid.v4(), nombre: "Educacion" },
  { id: uuid.v4(), nombre: "Salidas" },
  { id: uuid.v4(), nombre: "Servcios" },
  { id: uuid.v4(), nombre: "Trabajo" },
  { id: uuid.v4(), nombre: "Transporte" },
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

  if (newOperation.tipo === "Gasto") {
    newOperation.monto = Number(newOperation.monto) * -1;
  }

  operations.push(newOperation);
  localStorage.setItem("operacionesStorage", JSON.stringify(operations));
  const getOperacionesStorage = JSON.parse(localStorage.getItem("operacionesStorage"));

  resetFormOperation();
  operationsHtml(getOperacionesStorage);
  balanceHTML(getOperacionesStorage)
  filtrarOperaciones();

  formOperation.classList.add("is-hidden");
  balanceSection.classList.remove("is-hidden");
});

const operationsHtml = (operations) => {
  checkOperations(operations);
  addNewOperation.innerHTML = "";
  for (let i = 0; i < operations.length; i++) {
    const monto =
      operations[i].tipo === "Ganancia"
        ? `$${operations[i].monto}`
        : `$${operations[i].monto}`;
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
      <div class="column">
        <button class=" button is-info is-inverted is-small" onclick="editOperation('${operations[i].id}')"><i class="far fa-edit"></i></button>
        <button class="button is-danger is-inverted is-small" onclick="deleteOperation('${operations[i].id}')"><i class="fas fa-trash-alt"></i></button>
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



                                              // EDITAR OPERACIONES



const hideSectionsEditOperation = () => {
  categoriesSection.classList.add("is-hidden");
  reportsSection.classList.add("is-hidden");
  formOperation.classList.add("is-hidden");
  balanceSection.classList.add("is-hidden");
  formEditOperation.classList.remove("is-hidden");
};

const ShowSectionOperations = () => {
  categoriesSection.classList.add("is-hidden");
  reportsSection.classList.add("is-hidden");
  formOperation.classList.add("is-hidden");
  formEditOperation.classList.add("is-hidden");
  balanceSection.classList.remove("is-hidden");
};


// posición en el arrego de la operación a editar
let position;
const editOperation = (operation) => {
  hideSectionsEditOperation();
  position = operations.findIndex((elem) => elem.id === operation);
  operationEditDescription.value = operations[position].descripcion;
  operationEditAmount.value = operations[position].monto;
  operationEditType.value = operations[position].tipo;
  operationEditCategories.value = operations[position].categoria;
  operationEditDate.value = operations[position].fecha;
  if(operationEditType.value === 'Gasto'){
    operationEditAmount.value = Number(operations[position].monto) * -1;
  }
  return position;
};

btnEditOperation.addEventListener("click", () => {
  operations[position].descripcion = operationEditDescription.value;
  operations[position].monto = operationEditAmount.value;
  operations[position].tipo = operationEditType.value;
  operations[position].categoria = operationEditCategories.value;
  operations[position].fecha = operationEditDate.value;

  if(operations[position].tipo === 'Gasto'){
    operations[position].monto = Number(operationEditAmount.value) * -1;
  }

  localStorage.setItem("operacionesStorage", JSON.stringify(operations));
  operationsHtml(operations);
  balanceHTML(operations);

  ShowSectionOperations();
});

                                                // ELIMINAR OPERACIONES

const deleteOperation = (operation) => {
  const value = operations.findIndex((elem) => elem.id === operation);
  if (value >= 0) {
    operations.splice(value, 1);
    localStorage.setItem("operacionesStorage", JSON.stringify(operations));
    operationsHtml(operations);
    balanceHTML(operations);
  }
};

                                                // CATEGORIAS


// AGREGAR NUEVA CATEGORIA

btnAddCategory.addEventListener("click", () => {
  const newCategory = inputCategories.value;
  categories.push({ id: uuid.v4(), nombre: newCategory });

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
let resultado;
const editCategory = (category) => {
  hideSectionsEdit();
  const index = categories.findIndex((elem) => elem.id === category);
  inputEditCategory.value = categories[index].nombre;
  resultado =  {i: index, valor: inputEditCategory.value};
  return resultado
};

btnEditCategory.addEventListener("click", () => {
  categories[resultado.i].nombre = inputEditCategory.value;
  localStorage.setItem("categoriasStorage", JSON.stringify(categories));
  categoriesHTML(categories);
  categoriesSelect(categories);

  operations.forEach(() => {
    const posicion = operations.findIndex(
      (operation) => operation.categoria === resultado.valor);
    if (posicion >= 0) {
      operations[posicion].categoria = inputEditCategory.value
      localStorage.setItem("operacionesStorage", JSON.stringify(operations))
    }
    operationsHtml(operations);
    balanceHTML(operations);
  });

  hideEditSection();
});

// ELIMINAR UNA CATEGORIA

const deleteCategory = (category) => {
  const categoryName = categories.find((elem) => elem.id === category);
  const value = categories.findIndex((elem) => elem.id === category);
  if (value >= 0) {
    categories.splice(value, 1);
    localStorage.setItem("categoriasStorage", JSON.stringify(categories));
    categoriesHTML(categories);
    categoriesSelect(categories);
  }
  operations.forEach(() => {
    const index = operations.findIndex(
      (operation) => operation.categoria === categoryName.nombre
    );
    if (index >= 0) {
      operations.splice(index, 1);
      localStorage.setItem("operacionesStorage", JSON.stringify(operations))
    }
    operationsHtml(operations);
    balanceHTML(operations);
  });
};

// PINTAR SECCION CATEGORIA
const categoriesHTML = (categories) => {
  categoriesList.innerHTML = "";
  for (let i = 0; i < categories.length; i++) {
    const categoria = `
    <div class="columns m-0 is-10 is-offset-2 is-justify-content-space-between">
      <div class="column is-size-7 is-10"><span class="has-background-info-dark has-text-white radius p-1">${categories[i].nombre}</span></div>
      <div class="column is-2 px-0">
        <a href="#" class="is-size-7 mr-2" onclick="editCategory('${categories[i].id}')">Editar</a>
        <a href="#" class="is-size-7" onclick="deleteCategory('${categories[i].id}')">Eliminar</a>
      </div>
    </div>
    `;
    categoriesList.insertAdjacentHTML("beforeend", categoria);
  }
};

// PINTAR EN LOS SELECT DE CATEGORIA

const categoriesSelect = (categories) => {
  operationCategories.innerHTML = "";
  filtersCategories.innerHTML = `<option value="Todas">Todas</option>`;
  for (let i = 0; i < categories.length; i++) {
    const categoria = `
    <option value="${categories[i].nombre}">${categories[i].nombre}</option>
    `;
    operationCategories.insertAdjacentHTML("beforeend", categoria);
    operationEditCategories.insertAdjacentHTML("beforeend", categoria);
    filtersCategories.insertAdjacentHTML("beforeend", categoria);
  }
};

categories =
  JSON.parse(localStorage.getItem("categoriasStorage")) ?? categories;
categoriesHTML(categories);
categoriesSelect(categories);

                                                    // BALANCE

const balanceData = (operaciones) => {
  return operaciones.reduce(
    (balance, operacion) => {
      if (operacion.tipo === "Ganancia") {
        return {
          ...balance,
          ganancias: Number(balance.ganancias) + Number(operacion.monto),
          total: Number(balance.total) + Number(operacion.monto),
        };
      }

      if (operacion.tipo === "Gasto") {
        return {
          ...balance,
          gastos: Number(balance.gastos) + Number(operacion.monto),
          total: Number(balance.total) + Number(operacion.monto),
        };
      }
    },
    {
      ganancias: 0,
      gastos: 0,
      total: 0,
    }
  );
};

const balanceHTML = (operaciones) => {
  const objBalance = balanceData(operaciones);

  balanceTotal.classList.remove("has-text-danger", "has-text-success");

  if (objBalance.total > 0) {
    balanceTotal.classList.add("has-text-success");
  }
  if (objBalance.total < 0) {
    balanceTotal.classList.add("has-text-danger");
  }

  balanceGanancia.innerHTML = `$${objBalance["ganancias"]}`;
  balanceGasto.innerHTML = `$${objBalance["gastos"]}`;
  balanceTotal.innerHTML = `$${objBalance["total"]}`;
};


                                                  // FILTROS

const filtrarTipo = (tipo, operaciones) =>
  operaciones.filter((operacion) => operacion.tipo === tipo);

const filtrarCategoria = (categoria, operaciones) =>
  operaciones.filter((operacion) => operacion.categoria === categoria);

const filtrarFechaMayorOIgual = (fecha, operaciones) =>
  operaciones.filter(
    (operacion) =>
      new Date(operacion.fecha).getTime() >= new Date(fecha).getTime()
  );

const ordenarMasMenosReciente = (operaciones, orden) => {
  const newArr = [...operaciones];
  let result;
  if (orden === "ASC") {
    result = newArr.sort((a, b) => (a.fecha > b.fecha ? 1 : -1));
  } else {
    result = newArr.sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
  }
  return result;
};

const ordenarMayorMenorMonto = (operaciones, orden) => {
  const newArr = [...operaciones];
  let result;
  if (orden === "ASC") {
    result = newArr.sort((a, b) =>
      Number(a.monto) > Number(b.monto) ? 1 : -1
    );
  } else {
    result = newArr.sort((a, b) =>
      Number(a.monto) < Number(b.monto) ? 1 : -1
    );
  }
  return result;
};

const ordenarAZ_ZA = (operaciones, orden) => {
  const newArr = [...operaciones];
  let result;
  if (orden === "A-Z") {
    result = newArr.sort((a, b) => (a.descripcion > b.descripcion ? 1 : -1));
  } else {
    result = newArr.sort((a, b) => (a.descripcion < b.descripcion ? 1 : -1));
  }
  return result;
};

const filtrarOperaciones = () => {
  const tipo = filtersType.value;
  const categoria = filtersCategories.value;
  const fecha = filtersDate.value;
  const orden = filtersOrder.value;


  let operaciones = operations;

  if (tipo !== "Todas") {
    operaciones = filtrarTipo(tipo, operaciones);
  }

  if (categoria !== "Todas") {
    operaciones = filtrarCategoria(categoria, operaciones);
  }

  operaciones = filtrarFechaMayorOIgual(fecha, operaciones);

  switch (orden) {
    case "Mas reciente":
      operaciones = ordenarMasMenosReciente(operaciones, "DESC");
      break;
    case "Menos reciente":
      operaciones = ordenarMasMenosReciente(operaciones, "ASC");
      break;
    case "Mayor monto":
      operaciones = ordenarMayorMenorMonto(operaciones, "DESC");
      break;
    case "Menor monto":
      operaciones = ordenarMayorMenorMonto(operaciones, "ASC");
      break;
    case "A/Z":
      operaciones = ordenarAZ_ZA(operaciones, "A-Z");
      break;
    case "Z/A":
      operaciones = ordenarAZ_ZA(operaciones, "Z-A");
      break;
    default:
      break;
  }

  operationsHtml(operaciones);
  balanceHTML(operaciones);
};

filtersType.addEventListener("change", filtrarOperaciones);
filtersCategories.addEventListener("change", filtrarOperaciones);
filtersDate.addEventListener("change", filtrarOperaciones);
filtersOrder.addEventListener("change", filtrarOperaciones);


                                                  // REPORTES

const conReportes = document.getElementById('with-reports');
const sinReportes = document.getElementById('without-reports');
const resumenCategGanancia = document.getElementById('resumen-categ-mayor-ganancia');
const resumenCategGasto = document.getElementById('resumen-categ-mayor-gasto');
const resumenCategBalance= document.getElementById('resumen-categ-mayor-balance');
const resumenMesGanancia = document.getElementById('resumen-mes-mayor-ganancia');
const resumenMesGasto = document.getElementById('resumen-mes-mayor-ganancia');
const reporteTotalCateg = document.getElementById('report-categories-total');
const reporteTotalMes = document.getElementById('report-mes-total');

let resultGastosGananciasCateg = {};

const gastosGananciasCateg = (operaciones) =>{
  if(filtrarTipo('Ganancia', operaciones).length &&
  filtrarTipo('Gasto', operaciones).length ){
    sinReportes.classList.add('is-hidden')
    conReportes.classList.remove('is-hidden')
  }

  const parcial = [];

  for (let i = 0; i < categories.length; i++) {
    const categoriaGanancia = operaciones.filter(operacion => operacion.categoria === categories[i].nombre && operacion.tipo === 'Ganancia').reduce((inicial, current) => Number(inicial) + Number(current.monto) ,0)

    const categoriaGasto = operaciones.filter(operacion => operacion.categoria === categories[i].nombre && operacion.tipo === 'Gasto').reduce((inicial, current) => Number(inicial) + Number(current.monto) ,0)

    const categoriaBalance = categoriaGanancia + categoriaGasto
    parcial.push({nombre: categories[i].nombre, ganancia: categoriaGanancia, gasto: categoriaGasto, balance: categoriaBalance})
  }

  resultGastosGananciasCateg = parcial.filter(elemen => elemen.ganancia > 0 || elemen.gasto < 0 )
  console.log(resultGastosGananciasCateg);

  const max = Math.max(...resultGastosGananciasCateg.map(valor => valor.ganancia))
  const mayorGanancia = resultGastosGananciasCateg.find(elemen => elemen.ganancia === max)
  resumenHTML(mayorGanancia, resumenCategGanancia, 'ganancia', 'has-text-success')

  const min = Math.min(...resultGastosGananciasCateg.map(valor => valor.gasto))
  const mayorGasto = resultGastosGananciasCateg.find(elemen => elemen.gasto === min)
  resumenHTML(mayorGasto, resumenCategGasto, 'gasto', 'has-text-danger')

  
  const maxBalance = Math.max(...resultGastosGananciasCateg.map(valor => valor.balance))
  const mayorBalance = resultGastosGananciasCateg.find(elemen => elemen.balance === maxBalance)
  resumenHTML(mayorBalance, resumenCategBalance, 'balance')

  

  totalesPorCategHTML(resultGastosGananciasCateg)
  return resultGastosGananciasCateg
 
};


const totalesPorCategHTML = (array) =>{
  reporteTotalCateg.innerHTML = " ";
  for (let i = 0; i < array.length; i++) {
    const box = `
    <div class="columns has-text-weight-medium m-0">
            <div class="column has-text-centered is-3">${array[i].nombre}</div>
            <div class="column has-text-centered has-text-success is-3">$${array[i].ganancia}</div>
            <div class="column has-text-centered has-text-danger is-3">$${array[i].gasto}</div>
            <div class="column has-text-centered is-3">$${array[i].balance}</div>
          </div>
    `
    reporteTotalCateg.insertAdjacentHTML("beforeend", box);
    
  }
}
const resumenHTML = (objeto, caja, tipo, color) => {
  console.log(objeto);
  caja.innerHTML = ' ';
 
  const box = `
  <div class="columns has-text-weight-medium m-0 is-6">
    <div class="column">${objeto.nombre}</div>
    <div class="column ${color}">$${objeto[tipo]}</div>
  </div>
  `
  caja.insertAdjacentHTML("beforeend", box);
}

console.log(gastosGananciasCateg(operations))
filtrarOperaciones();