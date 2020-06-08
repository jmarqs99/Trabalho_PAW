export class Teste{
    _id:String;
    nmrCC:String;
    pedidoId:String;
    hora:Number;
    date:Date;
    resultadoTeste: {type:String, default:"indefinido"};
    estadoTeste: {type:String, default: "agendado"};
}