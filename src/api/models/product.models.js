/*Consultas sql */

import connection from "../database/db.js";

const selectAllProducts = () => {
    const sql = "SELECT * FROM products";
    return connection.query(sql);
}

const selectProductWhereId = (id) => {
    let sql = "SELECT * FROM products WHERE id = ?";
    return connection.query(sql,[id]);

}

const insertProduct = (titulo, precio, ruta_img, autor, categoria,sinopsis, activo) => {
    let sql = "INSERT INTO products (titulo, precio, ruta_img, autor, categoria, sinopsis, activo) VALUES (?,?,?,?,?,?,?)";
    return connection.query(sql, [titulo, precio, ruta_img, autor, categoria, sinopsis, activo]);
}

const updateProduct = (id,titulo, precio, ruta_img, autor, categoria, sinopsis, activo) => {
    let sql =  `
            UPDATE products 
            SET titulo=?, precio=?, ruta_img=?, autor=?, categoria=?, sinopsis=?, activo=?
            WHERE id= ? 
            `;

    return connection.query(sql,[titulo, precio, ruta_img, autor, categoria, sinopsis, activo, id]);
}

const deleteProduct = (id) => {
    let sql = "UPDATE products SET activo=0 WHERE id = ?";
    return connection.query(sql, [id]);

}

const activateProduct = (id) => {
    let sql = "UPDATE products SET activo=1 WHERE id = ?";
    return connection.query(sql, [id]);

}


export default {
    selectAllProducts,
    selectProductWhereId,
    insertProduct,
    deleteProduct,
    updateProduct,
    activateProduct
}