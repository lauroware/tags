para correrlo se instala
Node js
actualizar librerias con npm install

Se corre con el comando npm run dev

Usa la base de datos mongo db

Los usuarios nuevos los creo directamente con otra aplicación. no van a poder crear usuarios nuevos quien entre a la pagina. En realidad yo creo el usuario (tag) y password lo asociaría a un array de mascotas vacio que solo va a tener id de usuario, tag e id de mascota. Cuando el propietario del tag entra, carga los datos de de la mascota (products), los graba y ya queda el perfil configurado.
El problema es que la plantilla admin me trae toda la base de datos. Pude hacer que me traiga solo el valor del tag a traves de la propiedad userId pero se me desconfiguró el botón actualizar y no tuve manera de arregarlo.
Conclusión si se logra que admin.handlebars liste una sola tarjeta (la que coincida el tag o el id) y funcione el botón actualizar estamos hechos.
El resto yo lo puedo ir arreglando y corrigiendo.

ah tengo dos pantallas admin, la que funciona es admin2, tendrias que cambiarle el nombre a admin, la primera solo trae una tarjeta, pero no los datos.

Usuarios:

se loguea con el tag

usuarios creados

tag 1
clave 123

tag 2
clave 123

tag 3
clave 123

Base de datos usuarios:
[
{
"_id": {
"$oid": "650a7b4287bc7b03925926ce"
},
"first_name": "Lauro",
"last_name": "Ware",
"email": "lauro.ware@gmail.com",
"age": 39,
"password": "$2b$10$p0PLLISkaPuaZrZ.gCfjAegdMtsZBNY26mCG0IesP5KNPMnQLhIEu",
"role": "admin",
"cartId": {
"$oid": "650a7b4187bc7b03925926cc"
},
"lastLoginDate": {
"$date": "2024-03-25T07:04:02.395Z"
},
"__v": 0,
"tag": "3"
},
{
"_id": {
"$oid": "650a6857dee60ed56fb636cf"
},
"first_name": "2",
"last_name": "",
"email": "martinurquiza07@gmail.com",
"age": 38,
"password": "$2b$10$kEwEmPcqF.jqB9uh8uTJF.Hbjaihq8JA4gUJLjUW56DENutYf2aXu",
"role": "admin",
"cartId": {
"$oid": "650a6857dee60ed56fb636cd"
},
"lastLoginDate": {
"$date": "2024-03-25T06:36:38.857Z"
},
"__v": 0,
"tag": "2"
},
{
"_id": {
"$oid": "25"
},
"first_name": "",
"last_name": "",
"email": "martinurquiza07@gmail.com",
"age": 38,
"password": "$2b$10$p0PLLISkaPuaZrZ.gCfjAegdMtsZBNY26mCG0IesP5KNPMnQLhIEu",
"role": "admin",
"cartId": {
"$oid": "650a6857zxdee60ed56fb636cd"
},
"lastLoginDate": {
"$date": "2024-03-25T06:36:38.857Z"
},
"__v": 0,
"tag": "1"
}
]

Base de datos mascotas (productos)

[{
"_id": {
"$oid": "6456be757c5909fc4c7ae733"
},
"title": "Pepito1",
"description": "Soy muy bueno, pero lamentablemente no estoy acostumbrado a socializar, tengan precaución en especial con niños y otras mascotas. ",
"thumbnail": "https://media.istockphoto.com/id/1281495454/es/foto/perro-bull-terrier-blanco-sentado-en-el-parque.jpg?s=612x612&w=0&k=20&c=gSXOG7cmZIa2905ALw3dgt6NJTpIGZcG6PjgYV8gSEg=",
"enfermedades": "Tengo problemas en la vista, me ponen gotitas. No estoy castrado",
"medicamentos": "Nada",
"tag": "3",
"telefono": "1562366175",
"fechadenacimiento": "2016",
"nombredelhumano": "Lauro",
"email": "lauro.ware@gmail.com.ar",
"userId": "650a7b4287bc7b03925926ce",
"dire": "6456be757c5909fc4c7ae733",
"category": "",
"price": null,
"stock": null
},
{
"_id": {
"$oid": "65f90d18e3545ce263fbc8f7"
},
"title": "Armin",
"thumbnail": "https://t2.ea.ltmcdn.com/es/posts/1/6/2/10_curiosidades_del_golden_retriever_21261_orig.jpg",
"fechadenacimiento": "2016",
"description": "Soy muy bueno, y sociable con las personas y los niños, pero no con otros perros, tengan precaución,",
"medicamentos": "Nada",
"enfermedades": "Tengo problemas de piel, pero no estoy medicado. No estoy castrado",
"telefono": "1562366173",
"tag": "2",
"nombredelhumano": "Martín",
"email": "martinurquiza07@gmail.com.ar",
"userId": "650a6857dee60ed56fb636cf",
"dire": "6456be757c5909fc4c7ae733"
},
{
"_id": {
"$oid": "65f90d18e3545ce263fbc8f8"
},
"title": "Pancha Noe",
"thumbnail": "data:image/jpeg;base64,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",
"fechadenacimiento": "2017",
"description": "Soy infumable",
"medicamentos": "nada",
"enfermedades": "no castrada",
"telefono": "45835250",
"tag": "1",
"nombredelhumano": "ware",
"email": "noelenware@gmail.com.ar",
"userId": "660192fca2099c8b7dd0bf71"
}]
