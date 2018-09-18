var myApp = angular.module("DeliverEat", []);

myApp.controller("PedidoLoQueSeaController",
    function ($scope, $http) {
        $scope.Titulo = "DeliverEat";
        $scope.CantidadDetalles = 1;
        $scope.Pedido = [{nroDetalle: $scope.CantidadDetalles, detalle: "", bandera: false, fotografia: undefined}];
        $scope.CostoEnvio = 30;

        $scope.Ciudad = "0";
        $scope.DireccionEntrega = "";
        $scope.DireccionRetiro = "";
        $scope.TipoPago = "0";
        $scope.MontoAbonar = "0";
        $scope.TipoTarjeta = "0";
        $scope.OchoDigitos = "";
        $scope.CodigoSeguridad = "";
        $scope.MesVencimiento = "";
        $scope.AnoVencimiento = "";
        
        

        $scope.analizarCambio = function (objeto) {
            if (!objeto.bandera) {
                  objeto.bandera = true;
                  $scope.agregar();
            }
        };

        $scope.agregar = function () {
             $scope.CantidadDetalles = ($scope.CantidadDetalles + 1);
             $scope.Pedido.push({ nroDetalle: $scope.CantidadDetalles, detalle: "", bandera: false, fotografia: undefined });
        };

        $scope.eliminar = function (objeto) {
            if (objeto.nroDetalle < $scope.CantidadDetalles) {
                $scope.Pedido.splice(objeto.nroDetalle - 1, 1);
                $scope.CantidadDetalles = ($scope.CantidadDetalles - 1);
                $scope.reestructurarIndices();
            }
        };

        $scope.reestructurarIndices = function () {
            for (var i = 0; i < $scope.CantidadDetalles; i++) {
                $scope.Pedido[i].nroDetalle = i + 1;
            }
        }
        

        $scope.ConfirmarPedido = function () {
            if ($scope.Ciudad < 1 || $scope.Ciudad > 3)
            {
                window.alert("¡DEBE SELECIONAR UNA CIUDAD!");
            }

            else if ($scope.DireccionEntrega == "")
            {
                window.alert("¡DEBE INGRESAR UNA DIRECCION DE ENTREGA!");
            }

            else if ($scope.DireccionRetiro == "")
            {
                window.alert("¡DEBE INGRESAR UNA DIRECCION DE RETIRO!");
            }
            
            else if ($scope.CantidadDetalles == "1") {
                window.alert("¡DEBE INGRESAR AL MENOS UN DETALLE EN EL PEDIDO!");
            }
            else if ($scope.TipoPago < 1 || $scope.TipoPago > 2) {
                window.alert("¡DEBE SELECIONAR UN TIPO DE PAGO!");
            }
            else {

                if ($scope.TipoPago == 1) {
                    if ($scope.MontoAbonar < $scope.CostoEnvio) {
                        window.alert("¡EL MONTO A ABONAR DEBE SER MAYOR AL COSTO DE ENVIO!");
                    }
                    else {
                        //EXITOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO

                        window.alert("PEDIDO CONFIRMADO SATISFACTORIAMENTE!!!!");
                    }
                }
                else if ($scope.TipoPago == 2) {
                    
                    if ($scope.TipoTarjeta != "1") {
                        window.alert("¡DEBE SELECCIONAR CON QUE TIPO DE TARJETA VA A ABONAR!");
                    }
                    else if ($scope.CodigoSeguridad == "") {
                        window.alert("¡CODIGO SEGURIDAD INCORRECTO!");
                    } else if ($scope.OchoDigitos == "") {
                        window.alert("¡NUMERO DE TARJETA INCORRECTO!");
                    } else if ($scope.AnoVencimiento == "") {
                        window.alert("¡INGRESE ANO DE VENCIMIENTO!");
                    } else if ($scope.MesVencimiento == "") {
                        window.alert("¡INGRESE MES DE VENCIMIENTO!");
                    }
                    else {
                        window.alert("PEDIDO CONFIRMADO SATISFACTORIAMENTE!!!!");
                    }
                }
            }
        }

        $scope.CancelarPedido = function () {
            window.alert("PEDIDO CANCELADO SE VUELVE AL MENU DE INICIO");
        }

    });