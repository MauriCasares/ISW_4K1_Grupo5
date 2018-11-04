var myApp = angular.module("DeliverEat", []);

myApp.controller("PedidoLoQueSeaController",
    function ($scope, $http) {
        $scope.Titulo = "DeliverEat";
        $scope.HOY = new Date();

        //Pedido
        $scope.CantidadDetalles = 1;
        $scope.Pedido = [{nroDetalle: $scope.CantidadDetalles, detalle: "", bandera: false, fotografia: undefined}];

        //Direcciones
        $scope.DireccionEntrega = "";
        $scope.DireccionRetiro = "";
        $scope.Ciudades = [{id: 1,  nombre:"Buenos Aires" }, {id: 2,  nombre:"Córdoba" }, {id: 2,  nombre:"Mendoza" }];
        $scope.CiudadSeleccionada = 0;

        //Entrega
        $scope.TipoEntega = 1;

        //COSTO Pedido
        $scope.CostoEnvio = 30;
        $scope.CostoPedido = $scope.CostoEnvio;
        
        //Tipo Pago
        $scope.TipoPago = 0;

        //Pago en efectivo
        $scope.MontoAbonar = 0;
        $scope.Vuelto = $scope.MontoAbonar - $scope.CostoPedido;
        
        //Pago con tarjeta
        $scope.TipoTarjeta = 0;
        $scope.NumeroTarjeta = "";
        $scope.CodigoSeguridad = "";
        $scope.MesVencimiento = "";
        $scope.AnoVencimiento = "";

        $scope.analizarCambio = function (objeto) {
            if (!objeto.bandera) {
                  objeto.bandera = true;
                  $scope.Agregar();
            }
            else
            {
                if (objeto.detalle.length == 0) {
                    $scope.Eliminar(objeto);
                }
            }
        };

        $scope.Agregar = function () {
             $scope.CantidadDetalles = ($scope.CantidadDetalles + 1);
             $scope.Pedido.push({ nroDetalle: $scope.CantidadDetalles, detalle: "", bandera: false, fotografia: undefined });
             $scope.CostoPedido = $scope.CostoPedido + 100;
        };

        $scope.Eliminar = function (objeto) {
            if (objeto.nroDetalle < $scope.CantidadDetalles) {
                $scope.Pedido.splice(objeto.nroDetalle - 1, 1);
                $scope.CantidadDetalles = ($scope.CantidadDetalles - 1);
                $scope.ReestructurarIndices();
                $scope.CostoPedido = $scope.CostoPedido - 100;
            }
        };

        $scope.ReestructurarIndices = function () {
            for (var i = 0; i < $scope.CantidadDetalles; i++) {
                $scope.Pedido[i].nroDetalle = i + 1;
            }
        }
        

        $scope.CalcularVuelto = function () {
                $scope.Vuelto = $scope.MontoAbonar - $scope.CostoPedido;

                if (isNaN($scope.Vuelto)) {
                    $scope.MontoAbonar = 0;
                    $scope.Vuelto = $scope.MontoAbonar - $scope.CostoPedido;
                }
        };


        $scope.ValidarDirecciones = function ()
        {
            var retorno = true;

            if ($scope.CiudadSeleccionada < 1 || $scope.CiudadSeleccionada > $scope.Ciudades.length)
            {
                window.alert("¡DEBE SELECIONAR UNA CIUDAD!");
                retorno = false;
            }

            else if ($scope.DireccionEntrega == "")
            {
                window.alert("¡DEBE INGRESAR UNA DIRECCION DE ENTREGA!");
                retorno = false;
            }

            else if ($scope.DireccionRetiro == "")
            {
                window.alert("¡DEBE INGRESAR UNA DIRECCION DE RETIRO!");
                retorno = false;
            }

            return retorno;
        }

        $scope.ValidarPedido = function () {
            var retorno = true;

            if ($scope.CantidadDetalles == "1") {
                window.alert("¡DEBE INGRESAR AL MENOS UN DETALLE EN EL PEDIDO!");
                retorno = false;
            }

            return retorno;
        }

        $scope.ValidarPago = function () {
            var retorno = true;

            if ($scope.TipoPago < 1 || $scope.TipoPago > 2) {
                window.alert("¡DEBE SELECIONAR UN TIPO DE PAGO!");
                retorno = false;
            }
            else {
                if ($scope.TipoPago == 1) {
                    if ($scope.MontoAbonar < $scope.CostoPedido) {
                        window.alert("¡EL MONTO A ABONAR DEBE SER MAYOR AL COSTO DEL PEDIDO!");
                        retorno = false;
                    }
                }
                else if ($scope.TipoPago == 2) {

                    if ($scope.TipoTarjeta != "1") {
                        window.alert("¡DEBE SELECCIONAR CON QUE TIPO DE TARJETA VA A ABONAR!");
                        retorno = false;
                    }
                    else if ($scope.CodigoSeguridad.length < 3 || isNaN($scope.CodigoSeguridad)) {
                        window.alert("¡CODIGO SEGURIDAD INCORRECTO!");
                        retorno = false;
                    } else if ($scope.NumeroTarjeta.length < 16 || isNaN($scope.NumeroTarjeta)){
                        window.alert("¡NUMERO DE TARJETA INCORRECTO!");
                        retorno = false;
                    } else if ($scope.AnoVencimiento.length < 2 || isNaN($scope.AnoVencimiento)){
                        window.alert("¡INGRESE ANO DE VENCIMIENTO!");
                        retorno = false;
                    } else if ($scope.AnoVencimiento.length < 2 || isNaN($scope.MesVencimiento)){
                        window.alert("¡INGRESE MES DE VENCIMIENTO!");
                        retorno = false;
                    }
                }
            }

           
            return retorno;
        }
        




        $scope.ConfirmarPedido = function () {
            var validar = true;



            if (!$scope.ValidarDirecciones()) validar = false;
                
            else if (!$scope.ValidarPedido()) validar = false;

            else if (!$scope.ValidarPago()) validar = false;

            if (validar) {
                window.alert("PEDIDO CONFIRMADO SATISFACTORIAMENTE \n Direccion Retiro: " + $scope.DireccionRetiro + " \n Direccion Entrega:  " + $scope.DireccionEntrega + " \n Monto Total: " + $scope.CostoPedido);
            }

            
        }

        $scope.CancelarPedido = function () {
            window.alert("PEDIDO CANCELADO SE VUELVE AL MENU DE INICIO");
        }

    });