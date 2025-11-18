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

const insertProduct = (titulo, precio, ruta_img, autor, categoria) => {
    let sql = "INSERT INTO products (titulo, precio, ruta_img, autor, categoria) VALUES (?,?,?,?,?)";
    return connection.query(sql, [titulo, precio, ruta_img, autor, categoria]);
}

const updateProduct = (id,titulo, precio, ruta_img, autor, categoria) => {
    let sql =  `
            UPDATE products 
            SET titulo=?, precio=?, ruta_img=?, autor=?, categoria=?
            WHERE id=? 
            `;

    return connection.query(sql,[ id,titulo, precio, ruta_img, autor, categoria]);
}

const deleteProduct = (id) => {
    let sql = "DELETE FROM products WHERE id=?";
    return connection.query(sql, [id]);

}


export default {
    selectAllProducts,
    selectProductWhereId,
    insertProduct,
    deleteProduct,
    updateProduct
}