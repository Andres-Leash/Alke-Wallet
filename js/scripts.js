// para login//

const form = document.getElementById("loginUsuario");

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email === 'correo@gmail.com' && password === '1234') {
            alert('Bienvenido, redirigiendo a su menu');
            window.location.replace('menu.html');
        }
        else {
            alert('Credenciales incorrectas, por favor, intente nuevamente')
        }
    })
}


//para menu//

const buttonDeposit = document.getElementById('deposit')
const buttonSendmoney = document.getElementById('sendmoney')
const buttonTransactions = document.getElementById('transactions')

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

//para depositar//

const saldoMenu = document.getElementById('saldo')

if (saldoMenu) {
    const saldo = Number(localStorage.getItem('saldo')) || 0
    saldoMenu.innerText = saldo
}



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

//para enviar dinero//

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

// para enviar dinero

//const tablaNuevoContacto = document.getElementById('contactos')
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

//Ver transacciones

if (!localStorage.getItem('operaciones')) {
    localStorage.setItem('operaciones', JSON.stringify([]));
}

function guardarOperacion(nombre, tipo, monto) {
    const operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];

    operaciones.push({
        nombre: nombre,
        tipo: tipo,
        monto: monto
    });

    localStorage.setItem('operaciones', JSON.stringify(operaciones));
};

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
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("cuerpoTablaTransacciones")) {
        cargarTabla();
    }
});




















