class ProductDTO {
  constructor(
    _id,
    email,
    title,
    description,
    fechadenacimiento,
    medicamentos,
    enfermedades,
    nombredelhumano,
    telefono,
    thumbnail,
    tag,
    userId
  ) {
    this._id = _id;
    this.email = email;
    this.title = title;
    this.description = description;
    this.fechadenacimiento = fechadenacimiento;
    this.medicamentos = medicamentos;
    this.enfermedades = enfermedades;
    this.nombredelhumano = nombredelhumano;
    this.telefono = telefono;
    this.thumbnail = thumbnail;
    this.tag = tag;
    this.userId = userId;
  }
}

export default ProductDTO;
