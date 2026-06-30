import { CONFIG } from "../config/config.js";
import { useCart } from "../context/CartContext.jsx";
import "../styles/Cart.css";

function CartScreen() {
const { cart, eliminarDelCarrito, aumentarCantidad, disminuirCantidad, vaciarCarrito } = useCart();

const total = cart.reduce(
    (acumulado, producto) =>
      acumulado + producto.precio * producto.cantidad,
    0
);

const finalizarCompra = () => {

let mensaje =
`Hola Zeus Import 👋

Quiero realizar el siguiente pedido:

`;

cart.forEach(producto => {
    mensaje += `🧴 ${producto.nombre} x${producto.cantidad} - $${producto.precio * producto.cantidad}\n`;
});

mensaje += `\n💰 Total: $${total}\n\n`;

mensaje += `Nombre:\n`;
mensaje += `Teléfono:\n`;
mensaje += `Dirección:\n`;

const telefono = CONFIG.WHATSAPP_NUMBER;

window.open(
    `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`,
    "_blank"
);

vaciarCarrito();
};

return (
  <div className="cart-container">
    <h1 className="cart-title">
      Mi carrito
    </h1>

    {cart.length === 0 ? (
      <div className="empty-cart">
        <h2>🛒</h2>
        <p>No hay productos agregados todavía.</p>
      </div>
    ) : (
      <>
        {cart.map((producto) => (
          <div
            key={producto._id}
            className="cart-item"
          >
            <h3>{producto.nombre}</h3>

            <div className="cart-actions">

              <button
                onClick={() =>
                  disminuirCantidad(producto._id)
                }
              >
                -
              </button>

              <span>
                {producto.cantidad}
              </span>

              <button
                onClick={() =>
                  aumentarCantidad(producto._id)
                }
              >
                +
              </button>

            </div>

            <p>
              Precio: ${producto.precio}
            </p>

            <p>
              Subtotal: $
              {producto.precio *
                producto.cantidad}
            </p>

            <button
              className="remove-btn"
              onClick={() =>
                eliminarDelCarrito(producto._id)
              }
            >
              Eliminar
            </button>
          </div>
        ))}

        <div className="cart-total">
          <h2>
            Total: ${total}
          </h2>
        </div>

        <button
          className="checkout-btn"
          onClick={finalizarCompra}
        >
          Finalizar compra por WhatsApp
        </button>
      </>
    )}
  </div>
);

}

export default CartScreen;