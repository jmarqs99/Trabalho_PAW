export class Teste{
    _id:String;
    nmrCC:String;
    pedidoId:String;
    ano:Number;
    mes:Number;
    dia:Number;
    hora:Number;
    minuto:Number;
    resultadoTeste: {type:String, default:"indefinido"};
    estadoTeste: {type:String, default: "agendado"};
}