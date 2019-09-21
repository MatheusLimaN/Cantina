import orderController from '../../order/controllers/order.controller';
import clientController from '../../client/controllers/client.controller';

const getData = async ({ init, end }) => {
    const clients = await clientController.getAllClients();
    const divida = clients.reduce((prev, next) => prev + next.Saldo, 0);

    const values = await orderController.getTotalValueOrdersByMonth({ init, end });
    const valorTotal = values.reduce((prev, next) => prev + next.valorTotal, 0);
    const valorPago = values.reduce((prev, next) => prev + next.valorPago, 0);
    const quantidade = values.reduce((prev, next) => prev + next.quantidade, 0);
    const valorDevido = values.reduce((prev, next) => prev + next.valorDevido, 0);
    let valorDevidoDown = false;
    let valorDevidoUp = false;

    if (valorDevido < 0) {
        valorDevidoDown = true;
    } else {
        valorDevidoUp = true;
    }

    return { divida, values: JSON.stringify(values), valorTotal, valorPago, valorDevido, quantidade, valorDevidoDown, valorDevidoUp };
}

export default {
    getData
};