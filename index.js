class Producto {
    constructor(id, nombre, precio, foto) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.foto = foto;
    }
}

class ElementoCarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}

const productos = [];
const elementosCarrito = [];

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarritoCompras = document.querySelector("#items")
const contenedorFooterCarrito = document.querySelector("#footer");

cargarProductos();
dibujarCarrito();
dibujarCatalogoProductos();

function cargarProductos() {
    productos.push(new Producto(1, 'Rtx 3080', 175000, './img/rtx-3080.jpg'));
    productos.push(new Producto(2, 'i5 10400', 15000, './img/i5-10400.jpg'));
    productos.push(new Producto(3, 'Ryzen 5 5600x', 30000, './img/ryzen-5-5600x.jpg'));
}

function dibujarCarrito() {
    contenedorCarritoCompras.innerHTML = "";

    elementosCarrito.forEach(
        (elemento) => {
            let renglonesCarrito= document.createElement("tr");
            
            renglonesCarrito.innerHTML = `
                <td>${elemento.producto.id}</td>
                <td>${elemento.producto.nombre}</td>
                <td><input id="cantidad-producto-${elemento.producto.id}" type="number" value="${elemento.cantidad}" min="1" max="1000" step="1" style="width: 50px;"/></td>
                <td>$ ${elemento.producto.precio}</td>
                <td><button id="eliminar-producto-${elemento.producto.id}" type="button" class="btn btn-danger"><i class="bi bi-trash-fill"></i></button></td>
                
            `;

            contenedorCarritoCompras.append(renglonesCarrito);
            
            let inputCantidadProducto = document.getElementById(`cantidad-producto-${elemento.producto.id}`);
            inputCantidadProducto.addEventListener('change', (ev) => {
                let nuevaCantidad = ev.target.value;
                elemento.cantidad = nuevaCantidad;
                
                dibujarCarrito();
            });
            
            
            let botonEliminarProducto = document.getElementById(`eliminar-producto-${elemento.producto.id}`);
            botonEliminarProducto.addEventListener('click', () => {
                
                let indiceEliminar =  elementosCarrito.indexOf(elemento);
                elementosCarrito.splice(indiceEliminar,1);
                
                dibujarCarrito();
            });
            
            
        }
        );
        
        const valorInicial = 0;
        const totalCompra = elementosCarrito.reduce(
            (previousValue, currentValue) => previousValue + currentValue.producto.precio*currentValue.cantidad,
            valorInicial
            );
            
            if(elementosCarrito.length == 0) {
                contenedorFooterCarrito.innerHTML = `<th scope="row" colspan="6">Carrito vacío - comience a comprar!</th>`;
            } else {
                contenedorFooterCarrito.innerHTML = `<th scope="row" colspan="6">Total de la compra: ${totalCompra}</th>`;
            }

}

function removerProductoCarrito(elementoAEliminar) {
    const elementosAMantener = elementosCarrito.filter((elemento) => elementoAEliminar.producto.id != elemento.producto.id);
    elementosCarrito.length = 0;

    elementosAMantener.forEach((elemento) => elementosCarrito.push(elemento));
}

function crearCard(producto) {
    let botonAgregar = document.createElement("button");
    botonAgregar.className = "btn btn-success";
    botonAgregar.innerText = "Agregar";

    let cuerpoCarta = document.createElement("div");
    cuerpoCarta.className = "card-body";
    cuerpoCarta.innerHTML = `
        <h5>${producto.nombre}</h5>
        <p>$ ${producto.precio} </p>
    `;
    cuerpoCarta.append(botonAgregar);

    let imagen = document.createElement("img");
    imagen.src = producto.foto;
    imagen.className = "card-img-top";
    imagen.alt = producto.nombre;

    let carta = document.createElement("div");
    carta.className = "card m-2 p-2";
    carta.style = "width: 18rem";
    carta.append(imagen);
    carta.append(cuerpoCarta);


    botonAgregar.onclick = () => {

        let elementoExistente = 
            elementosCarrito.find((elem) => elem.producto.id == producto.id);
        
        if(elementoExistente) {
            elementoExistente.cantidad+=1;
        } else {
            let elementoCarrito = new ElementoCarrito(producto, 1);
            elementosCarrito.push(elementoCarrito);
        }

        dibujarCarrito();

        swal({
            title: '¡Producto agregado!',
            text: `${producto.nombre} agregado al carrito`,
            icon: 'success',
            buttons: {
                cerrar: {
                    text: "cerrar",
                    value: false
                },
                carrito: {
                    text: "ir a carrito",
                    value: true
                }
            }
        }).then((decision) => {
            if(decision) {
                const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {keyboard: true});
                const modalToggle = document.getElementById('toggleMyModal'); 
                myModal.show(modalToggle);
            } else {
                swal("No quieres ir al carrito");
            }
        });


    }

    return carta;

}

function dibujarCatalogoProductos() {
    contenedorProductos.innerHTML = "";

    productos.forEach(
        (producto) => {
            let contenedorCarta = crearCard(producto);
            contenedorProductos.append(contenedorCarta);
        }
    );

}

//Local Storage 

catalogo_localStorage = () => { 
    localStorage.setItem("catalogo", JSON.stringify(productos))
}

catalogo_localStorage()

obtener_catalogo = () => { 

    if (localStorage.getItem ( "catalogo" )) { 
        let obtener_catalogo = JSON.parse(localStorage.getItem ( "catalogo" ))
        console.log(obtener_catalogo);
    }else console.log("No hay entradas en el localStorage");

}

obtener_catalogo()

//En proceso 
// carrito_localStorage = () => { 
//     localStorage.setItem( "carrito",JSON.stringify( elementosCarrito ) )
// }

// localStorage.setItem( "carrito",JSON.stringify( elementosCarrito ) )
//     carrito_localStorage()