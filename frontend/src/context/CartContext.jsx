import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
    const carritoGuardado = localStorage.getItem('zeus_cart');

    return carritoGuardado
    ? JSON.parse(carritoGuardado)
    : [];
});

useEffect(() => {
    localStorage.setItem(
    'zeus_cart',
    JSON.stringify(cart)
);
}, [cart]);

    const agregarAlCarrito = (producto) => {
    const existe = cart.find(item => item._id === producto._id);

    if (existe) {
        setCart(
        cart.map(item =>
            item._id === producto._id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
    );
    } else {
        setCart([
        ...cart,
        {
        ...producto,
        cantidad: 1
        }
    ]);
    }
};

const eliminarDelCarrito = (id) => {
    setCart(cart.filter(producto => producto._id !== id));
};

const aumentarCantidad = (id) => {
setCart(
    cart.map(producto => producto._id === id
        ? {
            ...producto,
            cantidad: producto.cantidad + 1
        }
        : producto
    )
);
};

const disminuirCantidad = (id) => {
setCart(
    cart.map(producto =>
        producto._id === id
        ? {
                ...producto,
                cantidad: producto.cantidad - 1
            }
        : producto
        )
    .filter(producto => producto.cantidad > 0)
);
};

const vaciarCarrito = () => {
    setCart([]);
};


return (
    <CartContext.Provider
    value={{
        cart,
        agregarAlCarrito,
        eliminarDelCarrito,
        aumentarCantidad,
        disminuirCantidad,
        vaciarCarrito
    }}
    >
    {children}
    </CartContext.Provider>
);
}

export const useCart = () => useContext(CartContext);