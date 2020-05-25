export class Pedido {
    _id : String;
    nmrCC: String;
    informacao: String;
    estadoUtilizador: String;
    estadoTeste: {type:String, default: "Por agendar"};
    resultadoTeste: {type:String, default:"indefinido"};
    havePDF: {type:Boolean, default:false};

}
