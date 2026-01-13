//----------------------------------Enviar dinero--------------------------------

// Programacion login.html

//Validador de inicio de sesion
const form = document.getElementById("loginUsuario");

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const email = document.getElementById('emailLogin').value;
        const password = document.getElementById('password').value;
        const usuarioValido = usuarios.find(u => u.usuario === email && u.password === password);

        if (usuarioValido) {
            alert('Bienvenido, redirigiendo a su menu');
            window.location.replace('menu.html');
        }
        else {
            alert('Credenciales incorrectas, por favor, intente nuevamente')
            document.getElementById('emailLogin').value = '';
            document.getElementById('password').value = '';
        }
    })
}

//Registro nuevo usuario

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('usuarios')) {
        localStorage.setItem('usuarios', JSON.stringify([]));
    }
    const registroUsuario = document.getElementById('registroUsuario');

    registroUsuario.addEventListener('submit', e => {
        e.preventDefault();

        const usuario = document.getElementById('emailRegistro').value.trim().toLowerCase();
        const password = document.getElementById('clave').value;
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const existe = usuarios.some(u => u.usuario === usuario);

        if (existe) {
            alert("El usuario ya está registrado");
            return;
        }
        usuarios.push({ usuario, password });
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
        alert("Usuario registrado con éxito");
        //limpia el formulario
        document.getElementById('emailRegistro').value = '';
        document.getElementById('clave').value = '';
        //oculta el modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalRegistro'));
        modal.hide();
    })
}
)


//----------------------------------Menu--------------------------------

// asignacion de constantes con manejo de DOM

const buttonDeposit = document.getElementById('deposit')
const buttonSendmoney = document.getElementById('sendmoney')
const buttonTransactions = document.getElementById('transactions')

//Programacion de botones depositar, enviar dinero y transacciones

if (buttonDeposit) {
    buttonDeposit.addEventListener('click', () => {
        alert('redirigiendo a depositar')
        window.location.replace('deposit.html')
    })
}

if (buttonSendmoney) {

    buttonSendmoney.addEventListener('click', () => {
        alert('redirigiendo a enviar dinero')
        window.location.replace('sendmoney.html')
    })
}

if (buttonTransactions) {

    buttonTransactions.addEventListener('click', () => {
        alert('redirigiendo a transacciones')
        window.location.replace('transactions.html')
    })
}

//Actualizacion de saldo menu con la variable saldo de localStorage o 0

const saldoMenu = document.getElementById('saldo')

if (saldoMenu) {
    const saldo = Number(localStorage.getItem('saldo')) || 0
    saldoMenu.innerText = saldo
}

//----------------------------------Depositar dinero--------------------------------

//Programacion para realizar deposito, se crea la variable en localStorage 'saldo' si no esta creada, y se guardan las operaciones con funcion guardarOperacion
document.addEventListener('DOMContentLoaded', () => {
    const formDeposito = document.getElementById('deposito')
    if (formDeposito) {
        formDeposito.addEventListener('submit', e => {
            e.preventDefault()
            const amount = Number(document.getElementById('amount').value)
            if (amount > 0) {
                const saldo = Number(localStorage.getItem('saldo')) || 0
                const nuevoSaldo = saldo + amount
                localStorage.setItem('saldo', nuevoSaldo)
                guardarOperacion('Mi deposito', 'deposito', amount)
                cargarTabla();
                alert('monto depositado, verifique en su menu')
            }
            else {
                alert('monto invalido')
            }
        }
        )
    }
})

//----------------------------------Enviar dinero--------------------------------

// Añadir nuevo contacto en sendmoney.html

const formNuevoContacto = document.getElementById('nuevoContacto')
const tablaNuevoContacto = document.getElementById('contactos')


if (formNuevoContacto) {
    formNuevoContacto.addEventListener('submit', e => {
        e.preventDefault()

        const nombre = document.getElementById('nombre').value
        const cbu = document.getElementById('cbu').value
        const alias = document.getElementById('alias').value
        const banco = document.getElementById('banco').value

        const tr = document.createElement('tr')
        tr.id = `cbu-${cbu}`

        const tdNombre = document.createElement('td')
        tdNombre.textContent = nombre

        const tdCbu = document.createElement('td')
        tdCbu.textContent = cbu

        const tdAlias = document.createElement('td')
        tdAlias.textContent = alias

        const tdBanco = document.createElement('td')
        tdBanco.textContent = banco

        tr.append(tdNombre, tdCbu, tdAlias, tdBanco)
        tablaNuevoContacto.append(tr)

        formNuevoContacto.reset()

        const modalEl = document.getElementById('modalNuevoContacto');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();

    })
}

// Programacion select del formulario para enviar dinero en sendmoney.html

const selectContacto = document.getElementById('selectContacto')
const tablaContactos = document.getElementById('contactos')

if (selectContacto && tablaContactos) {
    for (let i = 0; i < tablaContactos.rows.length; i++) {
        const row = tablaContactos.rows[i]
        const nombre = row.cells[0].textContent
        const cbu = row.cells[1].textContent
        const option = document.createElement('option')
        option.value = cbu
        option.textContent = nombre
        selectContacto.appendChild(option)
    }
}

// realizar el envio de dinero en sendmoney.html

document.addEventListener('DOMContentLoaded', () => {
    const formEnviarDinero = document.getElementById('enviarDinero')
    if (formEnviarDinero) {
        formEnviarDinero.addEventListener('submit', e => {
            e.preventDefault()
            const montoEnviarDinero = Number(document.getElementById('montoEnviarDinero').value)
            if (montoEnviarDinero > 0) {
                const saldo = Number(localStorage.getItem('saldo')) || 0
                const select = document.getElementById('selectContacto');
                const nombre = select.options[select.selectedIndex].text;
                const nuevoSaldo = saldo - montoEnviarDinero
                localStorage.setItem('saldo', nuevoSaldo)
                guardarOperacion(nombre, 'envio de dinero', montoEnviarDinero)
                cargarTabla();
                alert('monto enviado, verifique en su menu')
            }
            else {
                alert('monto invalido')
            }
            const modalEl = document.getElementById('modalEnviarDinero');
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal.hide();
        })
    }
})

//-----------------------Ver transacciones--------------------------

//Si no esta creado el JSON operaciones, con este se crea solo una vez al cargar la pagina

if (!localStorage.getItem('operaciones')) {
    localStorage.setItem('operaciones', JSON.stringify([]));
}

//Funcion guardar operacion usados tanto en depositos y envio de dinero

function guardarOperacion(nombre, tipo, monto) {
    const operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];

    operaciones.push({
        nombre: nombre,
        tipo: tipo,
        monto: monto
    });

    localStorage.setItem('operaciones', JSON.stringify(operaciones));
};

//Funcion para cargar la tabla de transacciones a partir de JSON creado, este se utiliza en depositos y envio de dinero
function cargarTabla() {
    const tbody = document.getElementById('cuerpoTablaTransacciones');
    if (!tbody) return;
    tbody.innerHTML = '';

    const operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];

    operaciones.forEach(operacion => {
        const fila = document.createElement('tr');

        const tdNombre = document.createElement('td');
        tdNombre.textContent = operacion.nombre;

        const tdTipo = document.createElement('td');
        tdTipo.textContent = operacion.tipo;

        const tdMonto = document.createElement('td');
        tdMonto.textContent = operacion.monto;

        fila.appendChild(tdNombre);
        fila.appendChild(tdTipo);
        fila.appendChild(tdMonto);

        tbody.appendChild(fila);
    });
}

//Carga la tabla al cargar el DOM de transacciones
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("cuerpoTablaTransacciones")) {
        cargarTabla();
    }
});




















