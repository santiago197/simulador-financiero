// Se complementa con el select de subtasa de interes
const oSubTasa = [];
oSubTasa[1] = 1; //Nominal anual
oSubTasa[2] = 2; //Nominal semestral
oSubTasa[3] = 4; //Nominal trimestral
oSubTasa[4] = 6; //Nominal bimestral
oSubTasa[5] = 12; //Nominal mensual
oSubTasa[6] = 12;//Efectiva mensual
oSubTasa[7] = 6; //Efectiva bimestral
oSubTasa[8] = 4; //Efectiva trimestral
oSubTasa[9] = 2; //Efectiva semestral
oSubTasa[10] = 1; //Efectiva anual

const oValidaNominal = [];
oValidaNominal[1] = true;
oValidaNominal[2] = true;
oValidaNominal[3] = true;
oValidaNominal[4] = true;
oValidaNominal[5] = true;

const oValidaAnticipada = [];
oValidaAnticipada[1] = true;

const oPeriocidad = [];
oPeriocidad[1] = 12;  // Mensual
oPeriocidad[2] = 6;  // Bimestral
oPeriocidad[3] = 4;  // Trimestral
oPeriocidad[4] = 2;  // Semestral
oPeriocidad[5] = 1;  // Anual

const oPeriodicidad = [];
oPeriodicidad[1] = 1;  // Mensual
oPeriodicidad[2] = 2;  // Bimestral
oPeriodicidad[3] = 3;  // Trimestral
oPeriodicidad[4] = 6;  // Semestral
oPeriodicidad[5] = 12;  // Anual

function amortiza() {
    value = document.getElementsByClassName('custom-control-input')[0].value;
    console.log(value);
    if (value == 0) {
        document.getElementsByClassName('custom-control-input')[0].value = '1';
    } else {
        document.getElementsByClassName('custom-control-input')[0].value = '0';
    }
    if (value == 0) {
        document.getElementsByClassName("textLabel")[0].style.display = "block";
        document.getElementsByClassName("textLabel")[1].style.display = "block";
        document.getElementsByClassName("textLabel")[2].style.display = "block";
        document.getElementsByClassName("divAmortiza")[0].style.display = "flex";
        document.getElementsByClassName("divAmortiza")[1].style.display = "block";
        document.getElementsByClassName("divAmortiza")[2].style.display = "flex";
        // document.getElementsByClassName("divAmortiza")[3].style.display = "flex";
        // document.getElementsByClassName("divAmortiza")[4].style.display = "flex";
        // document.getElementsByClassName("divAmortiza")[5].style.display = "flex";
        // document.getElementsByClassName("divAmortiza")[6].style.display = "flex";
    } else {
        document.getElementsByClassName("textLabel")[0].style.display = "none";
        document.getElementsByClassName("textLabel")[1].style.display = "none";
        document.getElementsByClassName("textLabel")[2].style.display = "none";
        document.getElementsByClassName("divAmortiza")[0].style.display = "none";
        document.getElementsByClassName("divAmortiza")[1].style.display = "none";
        document.getElementsByClassName("divAmortiza")[2].style.display = "none";
        // document.getElementsByClassName("divAmortiza")[3].style.display = "none";
        // document.getElementsByClassName("divAmortiza")[4].style.display = "none";
        // document.getElementsByClassName("divAmortiza")[5].style.display = "none";
        // document.getElementsByClassName("divAmortiza")[6].style.display = "none";
    }

}
function plazoMes() {

    var select = document.getElementById("plazo");
    var input = document.createElement("select");
    input.setAttribute("class", "form-control");
    input.setAttribute("name", "Plazo");
    input.setAttribute("required", "required");
    input.id = 'Plazo';

    for (var i = 0; i <= 72; i++) {
        var option = document.createElement("option");
        if (i == 0) {
            option.value = [''];
            option.text = ['-- Seleccionar --'];
        } else {
            option.value = [i];
            option.text = [i + ' cuota(s).'];
        }
        input.appendChild(option);
    }
    var div = document.createElement("div");
    div.setAttribute("class", "invalid-feedback");
    var divContent = document.createTextNode('Seleccione un plazo.');
    div.appendChild(divContent);
    select.appendChild(input);
    select.appendChild(div);
}
// Si la persona es natural valida que la tasa sea vencida y mensual
function validaPersona(sPersona) {
    if (sPersona.value == 1) {
        document.getElementById("TxtTasaInteres").value = 2;
        document.getElementById("TxtPeriocidad").value = 1;
        document.getElementById("TxtSubTasa").value = 10;
        $(".validaPersonaNatural").attr('disabled', 'disabled');
    } else {
        document.getElementById("TxtTasaInteres").value = '';
        $(".validaPersonaNatural").removeAttr('disabled', 'disabled');
    }
}
function calcular() {
    let aForm = $("#formId").serializeArray();    
    var oDatos = {};
    aForm.forEach(function (i) {
        oDatos[i.name] = i.value;
    });
    console.log(oDatos);
    if (!oDatos.TxtPorcentajeTasa || oDatos.TxtPorcentajeTasa <= 0) {
        alertify.error('Falta porcentaje de interes');
        return false;
    }
    /**Datos de Form */
    var nPorcentajeInteres = oDatos.TxtPorcentajeTasa / 100;
    var nPlazo = oDatos.Plazo;
    var nCapital = oDatos.TxtCapital;
    var nTipoTasa = oDatos.TxtTasaInteres;
    var nTipoPersona = oDatos.TxtTpoPersona;
    var nPeriocidad = oDatos.TxtPeriocidad;

    /**Variables para formulas */
    var nTasaMensual = 0;
    var nAnualidad = 0;

    // Si aplica amortizacion 1
    if(oDatos.TxtValorAmortizacion1){
        if(!oDatos.TxtVariableAmortizacion1){
            alertify.error('Debe seleccionar un variable de amortizacion');
            return false;
        }
        if(!oDatos.mesAmortizacion1){
            alertify.error('Debe seleccionar el mes a amortizar');
            return false;
        }
        var nValorAmortizacion1 = oDatos.TxtValorAmortizacion1;
        var nVariableAmortizacion1 = oDatos.TxtVariableAmortizacion1;
        var nMesAmortizacion1 = oDatos.mesAmortizacion1;
        var nIncluyeCuota1 = oDatos.incluyeCuota1;
    }

    // Si aplica amortizacion 2
    if(oDatos.TxtValorAmortizacion2){
        if(!oDatos.TxtVariableAmortizacion2){
            alertify.error('Debe seleccionar un variable de amortizacion');
            return false;
        }
        if(!oDatos.mesAmortizacion2){
            alertify.error('Debe seleccionar el mes a amortizar');
            return false;
        }
        var nValorAmortizacion2 = oDatos.TxtValorAmortizacion2;
        var nVariableAmortizacion2 = oDatos.TxtVariableAmortizacion2;
        var nMesAmortizacion2 = oDatos.mesAmortizacion2;
        var nIncluyeCuota2 = oDatos.incluyeCuota2;
    }
    // Si aplica amortizacion 3
    if(oDatos.TxtValorAmortizacion3){
        if(!oDatos.TxtVariableAmortizacion3){
            alertify.error('Debe seleccionar un variable de amortizacion');
            return false;
        }
        if(!oDatos.mesAmortizacion3){
            alertify.error('Debe seleccionar el mes a amortizar');
            return false;
        }
        var nValorAmortizacion3 = oDatos.TxtValorAmortizacion3;
        var nVariableAmortizacion3 = oDatos.TxtVariableAmortizacion3;
        var nMesAmortizacion3 = oDatos.mesAmortizacion3;
        var nIncluyeCuota3 = oDatos.incluyeCuota3;
    }
    // Si aplica amortizacion 4
    if(oDatos.TxtValorAmortizacion4){
        if(!oDatos.TxtVariableAmortizacion4){
            alertify.error('Debe seleccionar un variable de amortizacion');
            return false;
        }
        if(!oDatos.mesAmortizacion4){
            alertify.error('Debe seleccionar el mes a amortizar');
            return false;
        }
        var nValorAmortizacion4 = oDatos.TxtValorAmortizacion4;
        var nVariableAmortizacion4 = oDatos.TxtVariableAmortizacion4;
        var nMesAmortizacion4 = oDatos.mesAmortizacion4;
        var nIncluyeCuota4 = oDatos.incluyeCuota4;
    }
    if(oPeriodicidad[nPeriocidad]){
        nPlazo = nPlazo / oPeriodicidad[nPeriocidad];
    }

    // Si es mensual vencida y es persona natural
    if(nTipoTasa == 2 && nTipoPersona == 1){
        nTasaMensual = InteresEA(nPorcentajeInteres);
        nAnualidad = Anualidad(nTasaMensual, nPlazo, nCapital);
    }else if(nTipoPersona == 2){
        // Si es persona juridica capturamos sub tasa de interes
        var nSubTasa = oDatos.TxtSubTasa;
        if(oValidaNominal[nSubTasa]){
            var nTasaEfectivo = interesNominalEfectivo(nSubTasa,nPorcentajeInteres);
        }
        if(nTasaEfectivo){
            nPorcentajeInteres = nTasaEfectivo;
        }
        if(oValidaAnticipada[nTipoTasa]){
            var nTasaVencida = interesAnticipadoVencido(nPorcentajeInteres);
        }
        if(nTasaVencida){
            nPorcentajeInteres = nTasaVencida;
        }
        nTasaMensual = interesMensualVencido(nPorcentajeInteres,nSubTasa,nPeriocidad);
        nAnualidad = Anualidad(nTasaMensual, nPlazo, nCapital);
    }
    if(nValorAmortizacion1){
        var oResultado1 = Amortizacion(nAnualidad,nTasaMensual,nPlazo,nMesAmortizacion1,nIncluyeCuota1,nValorAmortizacion1,nVariableAmortizacion1);
        var nCuota1 = oResultado1.nCuota;
        var nValorPresente1 = oResultado1.nValorPresente;
        nPlazo = oResultado1.nPlazo;
        console.log(nPlazo);
        var nDecimalSobrante1 = oResultado1.nDecimalSobrante;
        var nNewCuota1 = oResultado1.nNewCuota;
    }    
    if(nValorAmortizacion2){
        nNewAnualidad = nAnualidad;
        if(nVariableAmortizacion1 == 2){
            nNewAnualidad = nNewCuota1;
        }
        var oResultado2 = Amortizacion(nNewAnualidad,nTasaMensual,nPlazo,nMesAmortizacion2,nIncluyeCuota2,nValorAmortizacion2,nVariableAmortizacion2,nDecimalSobrante1);
        var nCuota2 = oResultado2.nCuota;
        var nValorPresente2 = oResultado2.nValorPresente;
        nPlazo = oResultado2.nPlazo;
        console.log(nPlazo);
        var nDecimalSobrante2 = oResultado2.nDecimalSobrante;
        var nNewCuota2 = oResultado2.nNewCuota;        
    }
    if(nValorAmortizacion3){
        nNewAnualidad = nAnualidad;
        if(nVariableAmortizacion2 == 2){
            nNewAnualidad = nNewCuota2;
        }else if(nVariableAmortizacion1 == 2){
            nNewAnualidad = nNewCuota1;
        }
        var oResultado3 = Amortizacion(nNewAnualidad,nTasaMensual,nPlazo,nMesAmortizacion3,nIncluyeCuota3,nValorAmortizacion3,nVariableAmortizacion3,nDecimalSobrante2);
        var nCuota3 = oResultado3.nCuota;
        var nValorPresente3 = oResultado3.nValorPresente;
        nPlazo = oResultado3.nPlazo;
        var nDecimalSobrante3 = oResultado3.nDecimalSobrante;
        var nNewCuota3 = oResultado3.nNewCuota;        
    }
    if(nValorAmortizacion4){
        nNewAnualidad = nAnualidad;
        if(nVariableAmortizacion3 == 2){
            nNewAnualidad = nNewCuota3;
        }else if(nVariableAmortizacion2 == 2){
            nNewAnualidad = nNewCuota2;
        }else if(nVariableAmortizacion1 == 2){
            nNewAnualidad = nNewCuota1;
        }
        var oResultado4 = Amortizacion(nNewAnualidad,nTasaMensual,nPlazo,nMesAmortizacion4,nIncluyeCuota4,nValorAmortizacion4,nVariableAmortizacion4,nDecimalSobrante3);
        var nCuota4 = oResultado4.nCuota;
        var nValorPresente4 = oResultado4.nValorPresente;
        nPlazo = oResultado4.nPlazo;
        var nDecimalSobrante4 = oResultado4.nDecimalSobrante;
        var nNewCuota4 = oResultado4.nNewCuota;        
    }

    $("#tableAmortizacion").find('tbody').empty();
    var bStop = false;
    for (var i = 1; i <= nPlazo; i++) {
        if(nValorPresente1){
            if(i == nMesAmortizacion1){
                var nAnualidadAnterior = nAnualidad;
                if(nVariableAmortizacion1 == 2){
                    nAnualidadAnterior = nNewCuota1;
                }
                nAnualidad = nCuota1;
            }
        }
        if(nValorPresente2){
            if(i == nMesAmortizacion2){
                var nAnualidadAnterior = nAnualidad;
                if(nVariableAmortizacion2 == 2){
                    nAnualidadAnterior = nNewCuota2;
                }
                nAnualidad = nCuota2;
            }
        }
        if(nValorPresente3){
            if(i == nMesAmortizacion3){
                var nAnualidadAnterior = nAnualidad;
                if(nVariableAmortizacion3 == 2){
                    nAnualidadAnterior = nNewCuota3;
                }
                nAnualidad = nCuota3;
            }
        }
        if(nValorPresente4){
            if(i == nMesAmortizacion4){
                var nAnualidadAnterior = nAnualidad;
                if(nVariableAmortizacion4 == 2){
                    nAnualidadAnterior = nNewCuota4;
                }
                nAnualidad = nCuota4;
            }
        }
        var nIntereses = nCapital * nTasaMensual;
        var nAmortizacion = nAnualidad - nIntereses;
        var nSaldo = nCapital - nAmortizacion;
        if(bStop){
            nAmortizacion = nCapital;
            nAnualidad = nCapital + nIntereses;
            nSaldo = nCapital - nAmortizacion;
        }
        tbody = `<tr>
                    <td data-label="#">${i}</td>
                    <td data-label="Capital">${numberFormat(nCapital)}</td>
                    <td data-label="Intereses">${numberFormat(nIntereses)}</td>
                    <td data-label="Amortizacion">${numberFormat(nAmortizacion)}</td>
                    <td data-label="Cuota">${numberFormat(nAnualidad)}</td>
                    <td data-label="Saldo">${numberFormat(nSaldo)}</td>
                </tr>
        `
        nCapital = nSaldo;
        if(nAnualidadAnterior !== undefined){
            nAnualidad = nAnualidadAnterior;
            nAnualidadAnterior = undefined;
        }
        $("#tableAmortizacion").find('tbody').append(tbody);
        if(nPlazo == i && !bStop){
            if(nValorAmortizacion1 && !nValorAmortizacion2){
                if(nVariableAmortizacion1 == 1){  
                    nPlazo++;
                    bStop = true;
                }
            }else if(nValorAmortizacion2 && !nValorAmortizacion3){
                if(nVariableAmortizacion1 == 1){  
                    nPlazo++;
                    bStop = true;
                }else if(nVariableAmortizacion2 == 1){
                    nPlazo++;
                    bStop = true;
                }
            }else if(nValorAmortizacion3 && !nValorAmortizacion4){
                if(nVariableAmortizacion1 == 1){  
                    nPlazo++;
                    bStop = true;
                }else if(nVariableAmortizacion2 == 1){
                    nPlazo++;
                    bStop = true;
                }else if(nVariableAmortizacion3 == 1){
                    nPlazo++;
                    bStop = true;
                }
            }else if(nValorAmortizacion4){
                if(nVariableAmortizacion1 == 1){  
                    nPlazo++;
                    bStop = true;
                }else if(nVariableAmortizacion2 == 1){
                    nPlazo++;
                    bStop = true;
                }else if(nVariableAmortizacion3 == 1){
                    nPlazo++;
                    bStop = true;
                }else if(nVariableAmortizacion4 == 1){
                    nPlazo++;
                    bStop = true;
                }
            }
        }
    }
    $("#tasaSalida").text("Tasa interes: " + parseFloat(nTasaMensual * 100).toFixed(3) + " %");
    $("#cuotaMensual").text("Cuota Mensual: "+ numberFormat(nAnualidad));
    document.getElementById("tableAmortizacion").style.visibility = "visible";
    // $('html,body').animate({scrollTop: $(document).height()},1000);
    $("#tableAmortizacion").parent().css('height','400px');
    return false;
}

function Amortizacion(nAnualidad,nTasaMensual,nPlazo,nMesAmortizacion,nIncluyeCuota,nValorAmortizacion,nVariableAmortizacion,nDecimalSobrante = 0){
    var nValorPresente = calculaAmortizacion(nAnualidad,nTasaMensual,nPlazo,nMesAmortizacion,nDecimalSobrante);
    if(nIncluyeCuota == 0){
        nCuota = nAnualidad + parseFloat(nValorAmortizacion);
    }else{
        nCuota = nValorAmortizacion;
    }
    // Calculamos el proximo saldo para la amortizacion
    var nInteresAnterior = nValorPresente * nTasaMensual;
    var nSaldoSiguiente = nValorPresente - nCuota + nInteresAnterior;    
    if(nVariableAmortizacion == 1){
        var nNewPlazo = calculaPlazoAmortizacion(nSaldoSiguiente,nAnualidad,nTasaMensual);
        nPlazo = parseFloat(nMesAmortizacion) + nNewPlazo.nEntero        
        nDecimalSobrante = nNewPlazo.nDecimal;
    }else if(nVariableAmortizacion == 2){
        var nNewCuota = calculaCuotaAmortizacion(nPlazo,nMesAmortizacion,nSaldoSiguiente,nTasaMensual,nDecimalSobrante);
    }
    var oResult = {
        'nValorPresente': nValorPresente,
        'nCuota': nCuota,
        'nPlazo': nPlazo,
        'nNewCuota': nNewCuota,
        'nDecimalSobrante': nDecimalSobrante
    }
    return oResult;
}

function calculaCuotaAmortizacion(nPlazo,nMesAmortizacion,nValorPresente,nTasaMensual,nDecimalSobrante = 0){
    // R	=	VP
	//      1-(1+i)^-n
    //          i
    // =(1-(1+$C$18)^-21,546)/$C$18
    var nTiempo = nPlazo - nMesAmortizacion + nDecimalSobrante;
    nCuotas = (1 - Math.pow(1 + nTasaMensual, - nTiempo)) / nTasaMensual;
    nCuotas = nValorPresente / nCuotas;
    return nCuotas;

}

function calculaPlazoAmortizacion(nValorPresente,nAnualidad,nTasaMensual){
    // 6438761.89953806 
    // VP	=	R*(1-(1+I)^-n)/i
    // VP/R	=	(1-(1+I)^-n)/i
    nValorPresente = nValorPresente / nAnualidad;
    // (VP / R) * I	=	(1-(1+I)^-n)
    nValorPresente = nValorPresente * nTasaMensual;
    // ((VP / R) * I) - 1	=	-(1+I)^-n
    nValorPresente = nValorPresente - 1;
    // (((VP / R) * I) - 1) * -1	=	(1+I)^-n
    nValorPresente = nValorPresente * -1;
    // log ((((VP / R) * I) - 1) * -1) = -n*log((1+I))
    nAntesIgual = Math.log(nValorPresente);
    nDespuesIgual = Math.log(1 + nTasaMensual);
    // 
    nResult = nAntesIgual/nDespuesIgual;
    nResult = nResult * -1;
    // Separamos los decimales
    // nDecimal = nResult % 2;
    nSplit = nResult.toString().split('.');
    nDecimal = 0;
    if(nSplit[1]){
        nDecimal = 0 + '.'+nSplit[1];
    }
    nDecimal = parseFloat(nDecimal);
    // Obtenemos el plazo restante
    nEntero = Math.trunc(nResult);
    oResult = {
        'nEntero': nEntero,
        'nDecimal': nDecimal
    }
    return oResult;
}
function calculaAmortizacion(nAnualidad,nTasaMensual,nPlazo,nMesAmortizacion,nDecimalSobrante = 0){
    // R*(1-(1+I)^-n)/i
    // Calculamos el tiempo donde hace amortizacion
    var nTiempo = nPlazo - nMesAmortizacion + 1 + nDecimalSobrante;
    var nValorPresente = nAnualidad * (1 - Math.pow(1 + nTasaMensual, -nTiempo)) / nTasaMensual;
    return nValorPresente;
}
function interesNominalEfectivo(nSubTasa,nPorcentajeInteres){
    var nTasa = nPorcentajeInteres / oSubTasa[nSubTasa];
    return nTasa;
}
function interesAnticipadoVencido(nTasa){
    nTasa = nTasa / (1 - nTasa);
    return nTasa;
}
function interesMensualVencido(nTasa,nSubTasa,nPeriocidad){
    nTasa = Math.pow(1 + nTasa, oSubTasa[nSubTasa] / oPeriocidad[nPeriocidad]) - 1;
    return nTasa;
}
function InteresEA(nPorcentajeInteres) {
    //((1+0,15)^(1/12))-1
    var nTasaMensual = Math.pow(1 + nPorcentajeInteres, 1 / 12) - 1;
    return nTasaMensual;
}

function Anualidad(nTasa, nPlazo, nCapital) {
    var nAnualidad = (1 - (Math.pow(1 + nTasa, - nPlazo))) / nTasa;
    nAnualidad = nCapital / nAnualidad;
    return nAnualidad;
}


function numberFormat(number, format = true) {
    let numero = parseFloat(number).toFixed(2);

    if (isNaN(numero))
        return "-";

    if (format)
        return "$" + new Intl.NumberFormat("es-ES").format(numero);
    else
        return numero;
}

function validaMesesAmortizacion(nMeses){
    var nPlazo = $("#Plazo").val();
    var nMes = nMeses.val();
    if(parseInt(nPlazo) < parseInt(nMes)){
        alertify.warning('El mes de amortizacion supera el plazo');
        nMeses.val('');
    }
} 

function addAmortizacion(){
    var nValorAmortizacion1 = $("#TxtValorAmortizacion1").val();
    var nValorAmortizacion2 = $("#TxtValorAmortizacion2").val();
    var nValorAmortizacion3 = $("#TxtValorAmortizacion3").val();
    var nValorAmortizacion4 = $("#TxtValorAmortizacion4").val();
    if(!nValorAmortizacion1){
        return false;
    }
    if(nValorAmortizacion1 && !nValorAmortizacion2){
        hTemplte = templeteAmortizacion(2, 'Segunda');
        $("#divAmortiza2").html(hTemplte);
    }
    if(nValorAmortizacion1 && nValorAmortizacion2 && !nValorAmortizacion3){
        hTemplte = templeteAmortizacion(3, 'Tercer');
        $("#divAmortiza3").html(hTemplte);
    }
    if(nValorAmortizacion1 && nValorAmortizacion2 && nValorAmortizacion3 && !nValorAmortizacion4){
        hTemplte = templeteAmortizacion(4, 'Cuarta');
        $("#divAmortiza4").html(hTemplte);
        document.getElementById("btnAddAmortizacion").style.display = "none";
    }
}
function templeteAmortizacion(i,sText){
    var hTemplte = `
    <h3 style="font-size: 14px;text-align: center;color:red;">${sText} Amortizacion</h3>
    <hr style="background-color: #0172D0;;" />
    <div class="form-row">
        <div class="form-group col-md-12 col-sm-6 col-xs-6 col-lg-6">
            <label>Valor Amortizacion</label>
            <div class="input-group input-group-sm">
                <div class="input-group-prepend">
                    <span class="input-group-text">$</span>
                </div>
                <input type="number" placeholder="Valor Amortización" name="TxtValorAmortizacion${i}" id="TxtValorAmortizacion${i}" class="form-control" style="height:37px" />
            </div>
        </div>
        <div class="form-group col-md-12 col-sm-6 col-xs-6 col-lg-6">
            <label>Variable Amortizar</label>
            <select class="form-control" name="TxtVariableAmortizacion${i}">
                <option value="">Seleccione</option>
                <option value="1">Disminución Plazo</option>
                <option value="2">Disminución Cuota</option>
            </select>
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-md-12 col-sm-6 col-xs-6 col-lg-6">
            <label>Mes Amortizar</label>
            <input type="number" id="mesAmortizacion${i}" class="form-control mesAmortizacion" name="mesAmortizacion${i}">
        </div>
        <div class="form-group col-md-12 col-sm-6 col-xs-6 col-lg-6">
            <label>¿Incluye Cuota?</label>
            <select class="form-control" id="incluyeCuota${i}" name="incluyeCuota${i}">
                <option value="1">Si</option>
                <option value="0">No</option>
            </select>
        </div>
    </div>`;
    return hTemplte;
}
//Juridica cualquier tasa, natural mensual 

$(document).ready(function () {
    plazoMes();
    $('body').on('change','.mesAmortizacion',function(){
        validaMesesAmortizacion($(this));
    });
    // a = calculaPlazoAmortizacion(6438761.89953806,299060.061550048,0.0158426311697395);
    // console.log(a);
});
//INCLUYE 1--> Si dice si y paga 2000000 paga 500 de cuota y 1500000 de abono a capital