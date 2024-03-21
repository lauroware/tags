class ProductDTO {
  constructor(
    _id,
    title,
    description,
    fechadenacimiento,
    medicamentos,
    enfermedades,
    nombredelhumano,
    telefono,
    thumbnail,
    tag
  ) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.fechadenacimiento = fechadenacimiento;
    this.medicamentos = medicamentos;
    this.enfermedades = enfermedades;
    this.nombredelhumano = nombredelhumano;
    this.telefono = telefono;
    this.thumbnail = thumbnail;
    this.tag = tag;
  }
}

export default ProductDTO;
