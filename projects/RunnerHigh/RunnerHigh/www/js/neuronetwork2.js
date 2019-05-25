
   var predictdopamine = function (ContInputs, CatInputs) {
        var Cont_idx = 0;
        var Cat_idx = 0;
        var _Time__min__ = ContInputs[Cont_idx++];
        var _Heart_rate__ = ContInputs[Cont_idx++];
        var _Gender__ = CatInputs[Cat_idx++];
        var _VO2max__ = CatInputs[Cat_idx++];
        var __statist_max_input = [0, 0];
        __statist_max_input[0] = 80.0;
        __statist_max_input[1] = 200.0;
        var __statist_min_input = [0, 0];
        __statist_min_input[0] = 0.0;
        __statist_min_input[1] = 60.0;
        var __statist_max_target = [0, 0, 0];
        __statist_max_target[0] = 4953.0;
        __statist_max_target[1] = 499.0;
        __statist_max_target[2] = 170.0;
        var __statist_min_target = [0, 0, 0];
        __statist_min_target[0] = 257.0;
        __statist_min_target[1] = 35.0;
        __statist_min_target[2] = 20.0;
        var __statist_i_h_wts = (function (dims) { var allocate = function (dims) { if (dims.length == 0) {
            return 0;
        }
        else {
            var array = [];
            for (var i = 0; i < dims[0]; i++) {
                array.push(allocate(dims.slice(1)));
            }
            return array;
        } }; return allocate(dims); })([9, 7]);
        __statist_i_h_wts[0][0] = -4.14213894396379;
        __statist_i_h_wts[0][1] = -3.06210078694971;
        __statist_i_h_wts[0][2] = 4.75609763115513;
        __statist_i_h_wts[0][3] = -0.686920960917446;
        __statist_i_h_wts[0][4] = 5.61393167310956;
        __statist_i_h_wts[0][5] = 0.26286684383775;
        __statist_i_h_wts[0][6] = -1.88027977523091;
        __statist_i_h_wts[1][0] = -4.94776489344622;
        __statist_i_h_wts[1][1] = 0.514466466516908;
        __statist_i_h_wts[1][2] = 2.41426272015869;
        __statist_i_h_wts[1][3] = 1.79148671162598;
        __statist_i_h_wts[1][4] = 6.49428097886501;
        __statist_i_h_wts[1][5] = 1.91409535168894;
        __statist_i_h_wts[1][6] = -4.13248033461812;
        __statist_i_h_wts[2][0] = -10.6737272446651;
        __statist_i_h_wts[2][1] = -1.12157162375972;
        __statist_i_h_wts[2][2] = 3.11469096886715;
        __statist_i_h_wts[2][3] = 3.3346666223024;
        __statist_i_h_wts[2][4] = 10.7870437897689;
        __statist_i_h_wts[2][5] = -2.23219215872911;
        __statist_i_h_wts[2][6] = -2.17900565891914;
        __statist_i_h_wts[3][0] = -4.12030670332737;
        __statist_i_h_wts[3][1] = -3.6355527525125;
        __statist_i_h_wts[3][2] = 0.63114578616507;
        __statist_i_h_wts[3][3] = 0.141774706332368;
        __statist_i_h_wts[3][4] = 2.37382802802028;
        __statist_i_h_wts[3][5] = 1.75617139633661;
        __statist_i_h_wts[3][6] = -3.32224862102589;
        __statist_i_h_wts[4][0] = -8.75297905861781;
        __statist_i_h_wts[4][1] = -6.82665487030775;
        __statist_i_h_wts[4][2] = 1.00349868661372;
        __statist_i_h_wts[4][3] = 1.21515990653671;
        __statist_i_h_wts[4][4] = 3.72307278754448;
        __statist_i_h_wts[4][5] = 2.18645442637678;
        __statist_i_h_wts[4][6] = -3.55301038984538;
        __statist_i_h_wts[5][0] = -2.1472068517427;
        __statist_i_h_wts[5][1] = -2.91385542946449;
        __statist_i_h_wts[5][2] = 2.18532499636953;
        __statist_i_h_wts[5][3] = -0.688403689930465;
        __statist_i_h_wts[5][4] = 3.99370311032431;
        __statist_i_h_wts[5][5] = 1.25040039746086;
        __statist_i_h_wts[5][6] = -3.70676128124038;
        __statist_i_h_wts[6][0] = -6.11801774471568;
        __statist_i_h_wts[6][1] = -0.615180839452578;
        __statist_i_h_wts[6][2] = 2.16187789660443;
        __statist_i_h_wts[6][3] = 1.99107271944964;
        __statist_i_h_wts[6][4] = 1.27194183158324;
        __statist_i_h_wts[6][5] = 4.29516537971104;
        __statist_i_h_wts[6][6] = -1.43260237361788;
        __statist_i_h_wts[7][0] = -4.85860866420066;
        __statist_i_h_wts[7][1] = -2.77931252688519;
        __statist_i_h_wts[7][2] = 0.250362708258909;
        __statist_i_h_wts[7][3] = 0.479172935892949;
        __statist_i_h_wts[7][4] = 3.31885210906112;
        __statist_i_h_wts[7][5] = 0.605031141895381;
        __statist_i_h_wts[7][6] = -3.08918842835974;
        __statist_i_h_wts[8][0] = -6.81990238166241;
        __statist_i_h_wts[8][1] = -3.61558468616775;
        __statist_i_h_wts[8][2] = -2.29045636029721;
        __statist_i_h_wts[8][3] = 2.21621876375043;
        __statist_i_h_wts[8][4] = 2.7136225908344;
        __statist_i_h_wts[8][5] = 1.86963147520933;
        __statist_i_h_wts[8][6] = -4.85821340247209;
        var __statist_h_o_wts = (function (dims) { var allocate = function (dims) { if (dims.length == 0) {
            return 0;
        }
        else {
            var array = [];
            for (var i = 0; i < dims[0]; i++) {
                array.push(allocate(dims.slice(1)));
            }
            return array;
        } }; return allocate(dims); })([3, 9]);
        __statist_h_o_wts[0][0] = -2.21067330828496;
        __statist_h_o_wts[0][1] = 0.258144277354199;
        __statist_h_o_wts[0][2] = 0.246816209729445;
        __statist_h_o_wts[0][3] = -0.748521273545003;
        __statist_h_o_wts[0][4] = -2.2079349597815;
        __statist_h_o_wts[0][5] = 0.723334901343201;
        __statist_h_o_wts[0][6] = -1.23080298095657;
        __statist_h_o_wts[0][7] = 0.0719590473638152;
        __statist_h_o_wts[0][8] = 2.15437067876031;
        __statist_h_o_wts[1][0] = -2.11949272685727;
        __statist_h_o_wts[1][1] = -1.35875252430731;
        __statist_h_o_wts[1][2] = -0.221373752748364;
        __statist_h_o_wts[1][3] = -0.546675622139678;
        __statist_h_o_wts[1][4] = -0.37675502589441;
        __statist_h_o_wts[1][5] = 1.2961280603086;
        __statist_h_o_wts[1][6] = 0.331526091191588;
        __statist_h_o_wts[1][7] = -1.92905134495666;
        __statist_h_o_wts[1][8] = 1.81219298656603;
        __statist_h_o_wts[2][0] = 0.712694358817686;
        __statist_h_o_wts[2][1] = -2.13588602519793;
        __statist_h_o_wts[2][2] = -1.02778883185671;
        __statist_h_o_wts[2][3] = 3.23935164873324;
        __statist_h_o_wts[2][4] = -4.35295425671252;
        __statist_h_o_wts[2][5] = -1.18160644702338;
        __statist_h_o_wts[2][6] = 1.83089415709748;
        __statist_h_o_wts[2][7] = 0.961950448753475;
        __statist_h_o_wts[2][8] = 0.372848581847683;
        var __statist_hidden_bias = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        __statist_hidden_bias[0] = 3.97979353280168;
        __statist_hidden_bias[1] = 4.29889684230441;
        __statist_hidden_bias[2] = 6.45544945343994;
        __statist_hidden_bias[3] = 0.723959314589997;
        __statist_hidden_bias[4] = 2.30584366296102;
        __statist_hidden_bias[5] = 1.58227621337909;
        __statist_hidden_bias[6] = 4.19275748216097;
        __statist_hidden_bias[7] = 0.74807927371982;
        __statist_hidden_bias[8] = -0.23637221153106;
        var __statist_output_bias = [0, 0, 0];
        __statist_output_bias[0] = 0.0197612540649857;
        __statist_output_bias[1] = -0.0613934135970302;
        __statist_output_bias[2] = -0.161290857820845;
        var __statist_inputs = [0, 0, 0, 0, 0, 0, 0];
        var __statist_hidden = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        var __statist_outputs = [0, 0, 0];
        __statist_outputs[0] = -1.0E307;
        __statist_outputs[1] = -1.0E307;
        __statist_outputs[2] = -1.0E307;
        __statist_inputs[0] = _Time__min__;
        __statist_inputs[1] = _Heart_rate__;
        if ((function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(_Gender__, "0")) {
            __statist_inputs[2] = 1;
        }
        else {
            __statist_inputs[2] = 0;
        }
        if ((function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(_Gender__, "1")) {
            __statist_inputs[3] = 1;
        }
        else {
            __statist_inputs[3] = 0;
        }
        if ((function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(_VO2max__, "40")) {
            __statist_inputs[4] = 1;
        }
        else {
            __statist_inputs[4] = 0;
        }
        if ((function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(_VO2max__, "60")) {
            __statist_inputs[5] = 1;
        }
        else {
            __statist_inputs[5] = 0;
        }
        if ((function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(_VO2max__, "80")) {
            __statist_inputs[6] = 1;
        }
        else {
            __statist_inputs[6] = 0;
        }
        var __statist_delta = 0;
        var __statist_maximum = 1;
        var __statist_minimum = 0;
        var __statist_ncont_inputs = 2;
        for (var __statist_i = 0; __statist_i < __statist_ncont_inputs; __statist_i++) {
            {
                __statist_delta = (__statist_maximum - __statist_minimum) / (__statist_max_input[__statist_i] - __statist_min_input[__statist_i]);
                __statist_inputs[__statist_i] = __statist_minimum - __statist_delta * __statist_min_input[__statist_i] + __statist_delta * __statist_inputs[__statist_i];
            }
            ;
        }
        var __statist_ninputs = 7;
        var __statist_nhidden = 9;
        for (var __statist_row = 0; __statist_row < __statist_nhidden; __statist_row++) {
            {
                __statist_hidden[__statist_row] = 0.0;
                for (var __statist_col = 0; __statist_col < __statist_ninputs; __statist_col++) {
                    {
                        __statist_hidden[__statist_row] = __statist_hidden[__statist_row] + (__statist_i_h_wts[__statist_row][__statist_col] * __statist_inputs[__statist_col]);
                    }
                    ;
                }
                __statist_hidden[__statist_row] = __statist_hidden[__statist_row] + __statist_hidden_bias[__statist_row];
            }
            ;
        }
        for (var __statist_row = 0; __statist_row < __statist_nhidden; __statist_row++) {
            {
                if (__statist_hidden[__statist_row] > 100.0) {
                    __statist_hidden[__statist_row] = 1.0;
                }
                else {
                    if (__statist_hidden[__statist_row] < -100.0) {
                        __statist_hidden[__statist_row] = 0.0;
                    }
                    else {
                        __statist_hidden[__statist_row] = 1.0 / (1.0 + Math.exp(-__statist_hidden[__statist_row]));
                    }
                }
            }
            ;
        }
        var __statist_noutputs = 3;
        for (var __statist_row2 = 0; __statist_row2 < __statist_noutputs; __statist_row2++) {
            {
                __statist_outputs[__statist_row2] = 0.0;
                for (var __statist_col2 = 0; __statist_col2 < __statist_nhidden; __statist_col2++) {
                    {
                        __statist_outputs[__statist_row2] = __statist_outputs[__statist_row2] + (__statist_h_o_wts[__statist_row2][__statist_col2] * __statist_hidden[__statist_col2]);
                    }
                    ;
                }
                __statist_outputs[__statist_row2] = __statist_outputs[__statist_row2] + __statist_output_bias[__statist_row2];
            }
            ;
        }
        for (var __statist_row = 0; __statist_row < __statist_noutputs; __statist_row++) {
            {
                if (__statist_outputs[__statist_row] > 100.0) {
                    __statist_outputs[__statist_row] = 1.0;
                }
                else {
                    __statist_outputs[__statist_row] = Math.exp(__statist_outputs[__statist_row]);
                }
            }
            ;
        }
        __statist_delta = 0;
        for (var __statist_i = 0; __statist_i < __statist_noutputs; __statist_i++) {
            {
                __statist_delta = (__statist_maximum - __statist_minimum) / (__statist_max_target[__statist_i] - __statist_min_target[__statist_i]);
                __statist_outputs[__statist_i] = (__statist_outputs[__statist_i] - __statist_minimum + __statist_delta * __statist_min_target[__statist_i]) / __statist_delta;
            }
            ;
        }
        for (var __statist_ii = 0; __statist_ii < __statist_noutputs; __statist_ii++) {
            {
               // console.log(" Prediction_" + __statist_ii + " = " + __statist_outputs[__statist_ii]);
              
            }
            ;
        }

        return __statist_outputs[2];  // 2 - dophamine, 1 - adrenalin, 0 - noradrenalin
    };


var predictadrenaline = function (ContInputs, CatInputs) {
    var Cont_idx = 0;
    var Cat_idx = 0;
    var _Time__min__ = ContInputs[Cont_idx++];
    var _Heart_rate__ = ContInputs[Cont_idx++];
    var _Gender__ = CatInputs[Cat_idx++];
    var _VO2max__ = CatInputs[Cat_idx++];
    var __statist_max_input = [0, 0];
    __statist_max_input[0] = 80.0;
    __statist_max_input[1] = 200.0;
    var __statist_min_input = [0, 0];
    __statist_min_input[0] = 0.0;
    __statist_min_input[1] = 60.0;
    var __statist_max_target = [0, 0, 0];
    __statist_max_target[0] = 4953.0;
    __statist_max_target[1] = 499.0;
    __statist_max_target[2] = 170.0;
    var __statist_min_target = [0, 0, 0];
    __statist_min_target[0] = 257.0;
    __statist_min_target[1] = 35.0;
    __statist_min_target[2] = 20.0;
    var __statist_i_h_wts = (function (dims) {
        var allocate = function (dims) {
            if (dims.length == 0) {
                return 0;
            }
            else {
                var array = [];
                for (var i = 0; i < dims[0]; i++) {
                    array.push(allocate(dims.slice(1)));
                }
                return array;
            }
        }; return allocate(dims);
    })([9, 7]);
    __statist_i_h_wts[0][0] = -4.14213894396379;
    __statist_i_h_wts[0][1] = -3.06210078694971;
    __statist_i_h_wts[0][2] = 4.75609763115513;
    __statist_i_h_wts[0][3] = -0.686920960917446;
    __statist_i_h_wts[0][4] = 5.61393167310956;
    __statist_i_h_wts[0][5] = 0.26286684383775;
    __statist_i_h_wts[0][6] = -1.88027977523091;
    __statist_i_h_wts[1][0] = -4.94776489344622;
    __statist_i_h_wts[1][1] = 0.514466466516908;
    __statist_i_h_wts[1][2] = 2.41426272015869;
    __statist_i_h_wts[1][3] = 1.79148671162598;
    __statist_i_h_wts[1][4] = 6.49428097886501;
    __statist_i_h_wts[1][5] = 1.91409535168894;
    __statist_i_h_wts[1][6] = -4.13248033461812;
    __statist_i_h_wts[2][0] = -10.6737272446651;
    __statist_i_h_wts[2][1] = -1.12157162375972;
    __statist_i_h_wts[2][2] = 3.11469096886715;
    __statist_i_h_wts[2][3] = 3.3346666223024;
    __statist_i_h_wts[2][4] = 10.7870437897689;
    __statist_i_h_wts[2][5] = -2.23219215872911;
    __statist_i_h_wts[2][6] = -2.17900565891914;
    __statist_i_h_wts[3][0] = -4.12030670332737;
    __statist_i_h_wts[3][1] = -3.6355527525125;
    __statist_i_h_wts[3][2] = 0.63114578616507;
    __statist_i_h_wts[3][3] = 0.141774706332368;
    __statist_i_h_wts[3][4] = 2.37382802802028;
    __statist_i_h_wts[3][5] = 1.75617139633661;
    __statist_i_h_wts[3][6] = -3.32224862102589;
    __statist_i_h_wts[4][0] = -8.75297905861781;
    __statist_i_h_wts[4][1] = -6.82665487030775;
    __statist_i_h_wts[4][2] = 1.00349868661372;
    __statist_i_h_wts[4][3] = 1.21515990653671;
    __statist_i_h_wts[4][4] = 3.72307278754448;
    __statist_i_h_wts[4][5] = 2.18645442637678;
    __statist_i_h_wts[4][6] = -3.55301038984538;
    __statist_i_h_wts[5][0] = -2.1472068517427;
    __statist_i_h_wts[5][1] = -2.91385542946449;
    __statist_i_h_wts[5][2] = 2.18532499636953;
    __statist_i_h_wts[5][3] = -0.688403689930465;
    __statist_i_h_wts[5][4] = 3.99370311032431;
    __statist_i_h_wts[5][5] = 1.25040039746086;
    __statist_i_h_wts[5][6] = -3.70676128124038;
    __statist_i_h_wts[6][0] = -6.11801774471568;
    __statist_i_h_wts[6][1] = -0.615180839452578;
    __statist_i_h_wts[6][2] = 2.16187789660443;
    __statist_i_h_wts[6][3] = 1.99107271944964;
    __statist_i_h_wts[6][4] = 1.27194183158324;
    __statist_i_h_wts[6][5] = 4.29516537971104;
    __statist_i_h_wts[6][6] = -1.43260237361788;
    __statist_i_h_wts[7][0] = -4.85860866420066;
    __statist_i_h_wts[7][1] = -2.77931252688519;
    __statist_i_h_wts[7][2] = 0.250362708258909;
    __statist_i_h_wts[7][3] = 0.479172935892949;
    __statist_i_h_wts[7][4] = 3.31885210906112;
    __statist_i_h_wts[7][5] = 0.605031141895381;
    __statist_i_h_wts[7][6] = -3.08918842835974;
    __statist_i_h_wts[8][0] = -6.81990238166241;
    __statist_i_h_wts[8][1] = -3.61558468616775;
    __statist_i_h_wts[8][2] = -2.29045636029721;
    __statist_i_h_wts[8][3] = 2.21621876375043;
    __statist_i_h_wts[8][4] = 2.7136225908344;
    __statist_i_h_wts[8][5] = 1.86963147520933;
    __statist_i_h_wts[8][6] = -4.85821340247209;
    var __statist_h_o_wts = (function (dims) {
        var allocate = function (dims) {
            if (dims.length == 0) {
                return 0;
            }
            else {
                var array = [];
                for (var i = 0; i < dims[0]; i++) {
                    array.push(allocate(dims.slice(1)));
                }
                return array;
            }
        }; return allocate(dims);
    })([3, 9]);
    __statist_h_o_wts[0][0] = -2.21067330828496;
    __statist_h_o_wts[0][1] = 0.258144277354199;
    __statist_h_o_wts[0][2] = 0.246816209729445;
    __statist_h_o_wts[0][3] = -0.748521273545003;
    __statist_h_o_wts[0][4] = -2.2079349597815;
    __statist_h_o_wts[0][5] = 0.723334901343201;
    __statist_h_o_wts[0][6] = -1.23080298095657;
    __statist_h_o_wts[0][7] = 0.0719590473638152;
    __statist_h_o_wts[0][8] = 2.15437067876031;
    __statist_h_o_wts[1][0] = -2.11949272685727;
    __statist_h_o_wts[1][1] = -1.35875252430731;
    __statist_h_o_wts[1][2] = -0.221373752748364;
    __statist_h_o_wts[1][3] = -0.546675622139678;
    __statist_h_o_wts[1][4] = -0.37675502589441;
    __statist_h_o_wts[1][5] = 1.2961280603086;
    __statist_h_o_wts[1][6] = 0.331526091191588;
    __statist_h_o_wts[1][7] = -1.92905134495666;
    __statist_h_o_wts[1][8] = 1.81219298656603;
    __statist_h_o_wts[2][0] = 0.712694358817686;
    __statist_h_o_wts[2][1] = -2.13588602519793;
    __statist_h_o_wts[2][2] = -1.02778883185671;
    __statist_h_o_wts[2][3] = 3.23935164873324;
    __statist_h_o_wts[2][4] = -4.35295425671252;
    __statist_h_o_wts[2][5] = -1.18160644702338;
    __statist_h_o_wts[2][6] = 1.83089415709748;
    __statist_h_o_wts[2][7] = 0.961950448753475;
    __statist_h_o_wts[2][8] = 0.372848581847683;
    var __statist_hidden_bias = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    __statist_hidden_bias[0] = 3.97979353280168;
    __statist_hidden_bias[1] = 4.29889684230441;
    __statist_hidden_bias[2] = 6.45544945343994;
    __statist_hidden_bias[3] = 0.723959314589997;
    __statist_hidden_bias[4] = 2.30584366296102;
    __statist_hidden_bias[5] = 1.58227621337909;
    __statist_hidden_bias[6] = 4.19275748216097;
    __statist_hidden_bias[7] = 0.74807927371982;
    __statist_hidden_bias[8] = -0.23637221153106;
    var __statist_output_bias = [0, 0, 0];
    __statist_output_bias[0] = 0.0197612540649857;
    __statist_output_bias[1] = -0.0613934135970302;
    __statist_output_bias[2] = -0.161290857820845;
    var __statist_inputs = [0, 0, 0, 0, 0, 0, 0];
    var __statist_hidden = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var __statist_outputs = [0, 0, 0];
    __statist_outputs[0] = -1.0E307;
    __statist_outputs[1] = -1.0E307;
    __statist_outputs[2] = -1.0E307;
    __statist_inputs[0] = _Time__min__;
    __statist_inputs[1] = _Heart_rate__;
    if ((function (o1, o2) {
        if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        }
    })(_Gender__, "0")) {
        __statist_inputs[2] = 1;
    }
    else {
        __statist_inputs[2] = 0;
    }
    if ((function (o1, o2) {
        if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        }
    })(_Gender__, "1")) {
        __statist_inputs[3] = 1;
    }
    else {
        __statist_inputs[3] = 0;
    }
    if ((function (o1, o2) {
        if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        }
    })(_VO2max__, "40")) {
        __statist_inputs[4] = 1;
    }
    else {
        __statist_inputs[4] = 0;
    }
    if ((function (o1, o2) {
        if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        }
    })(_VO2max__, "60")) {
        __statist_inputs[5] = 1;
    }
    else {
        __statist_inputs[5] = 0;
    }
    if ((function (o1, o2) {
        if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        }
    })(_VO2max__, "80")) {
        __statist_inputs[6] = 1;
    }
    else {
        __statist_inputs[6] = 0;
    }
    var __statist_delta = 0;
    var __statist_maximum = 1;
    var __statist_minimum = 0;
    var __statist_ncont_inputs = 2;
    for (var __statist_i = 0; __statist_i < __statist_ncont_inputs; __statist_i++) {
        {
            __statist_delta = (__statist_maximum - __statist_minimum) / (__statist_max_input[__statist_i] - __statist_min_input[__statist_i]);
            __statist_inputs[__statist_i] = __statist_minimum - __statist_delta * __statist_min_input[__statist_i] + __statist_delta * __statist_inputs[__statist_i];
        }
        ;
    }
    var __statist_ninputs = 7;
    var __statist_nhidden = 9;
    for (var __statist_row = 0; __statist_row < __statist_nhidden; __statist_row++) {
        {
            __statist_hidden[__statist_row] = 0.0;
            for (var __statist_col = 0; __statist_col < __statist_ninputs; __statist_col++) {
                {
                    __statist_hidden[__statist_row] = __statist_hidden[__statist_row] + (__statist_i_h_wts[__statist_row][__statist_col] * __statist_inputs[__statist_col]);
                }
                ;
            }
            __statist_hidden[__statist_row] = __statist_hidden[__statist_row] + __statist_hidden_bias[__statist_row];
        }
        ;
    }
    for (var __statist_row = 0; __statist_row < __statist_nhidden; __statist_row++) {
        {
            if (__statist_hidden[__statist_row] > 100.0) {
                __statist_hidden[__statist_row] = 1.0;
            }
            else {
                if (__statist_hidden[__statist_row] < -100.0) {
                    __statist_hidden[__statist_row] = 0.0;
                }
                else {
                    __statist_hidden[__statist_row] = 1.0 / (1.0 + Math.exp(-__statist_hidden[__statist_row]));
                }
            }
        }
        ;
    }
    var __statist_noutputs = 3;
    for (var __statist_row2 = 0; __statist_row2 < __statist_noutputs; __statist_row2++) {
        {
            __statist_outputs[__statist_row2] = 0.0;
            for (var __statist_col2 = 0; __statist_col2 < __statist_nhidden; __statist_col2++) {
                {
                    __statist_outputs[__statist_row2] = __statist_outputs[__statist_row2] + (__statist_h_o_wts[__statist_row2][__statist_col2] * __statist_hidden[__statist_col2]);
                }
                ;
            }
            __statist_outputs[__statist_row2] = __statist_outputs[__statist_row2] + __statist_output_bias[__statist_row2];
        }
        ;
    }
    for (var __statist_row = 0; __statist_row < __statist_noutputs; __statist_row++) {
        {
            if (__statist_outputs[__statist_row] > 100.0) {
                __statist_outputs[__statist_row] = 1.0;
            }
            else {
                __statist_outputs[__statist_row] = Math.exp(__statist_outputs[__statist_row]);
            }
        }
        ;
    }
    __statist_delta = 0;
    for (var __statist_i = 0; __statist_i < __statist_noutputs; __statist_i++) {
        {
            __statist_delta = (__statist_maximum - __statist_minimum) / (__statist_max_target[__statist_i] - __statist_min_target[__statist_i]);
            __statist_outputs[__statist_i] = (__statist_outputs[__statist_i] - __statist_minimum + __statist_delta * __statist_min_target[__statist_i]) / __statist_delta;
        }
        ;
    }
    for (var __statist_ii = 0; __statist_ii < __statist_noutputs; __statist_ii++) {
        {
            // console.log(" Prediction_" + __statist_ii + " = " + __statist_outputs[__statist_ii]);

        }
        ;
    }

    return __statist_outputs[1];  // 2 - dophamine, 1 - adrenalin, 0 - noradrenalin
};

var predictnoradrenaline = function (ContInputs, CatInputs) {
    var Cont_idx = 0;
    var Cat_idx = 0;
    var _Time__min__ = ContInputs[Cont_idx++];
    var _Heart_rate__ = ContInputs[Cont_idx++];
    var _Gender__ = CatInputs[Cat_idx++];
    var _VO2max__ = CatInputs[Cat_idx++];
    var __statist_max_input = [0, 0];
    __statist_max_input[0] = 80.0;
    __statist_max_input[1] = 200.0;
    var __statist_min_input = [0, 0];
    __statist_min_input[0] = 0.0;
    __statist_min_input[1] = 60.0;
    var __statist_max_target = [0, 0, 0];
    __statist_max_target[0] = 4953.0;
    __statist_max_target[1] = 499.0;
    __statist_max_target[2] = 170.0;
    var __statist_min_target = [0, 0, 0];
    __statist_min_target[0] = 257.0;
    __statist_min_target[1] = 35.0;
    __statist_min_target[2] = 20.0;
    var __statist_i_h_wts = (function (dims) {
        var allocate = function (dims) {
            if (dims.length == 0) {
                return 0;
            }
            else {
                var array = [];
                for (var i = 0; i < dims[0]; i++) {
                    array.push(allocate(dims.slice(1)));
                }
                return array;
            }
        }; return allocate(dims);
    })([9, 7]);
    __statist_i_h_wts[0][0] = -4.14213894396379;
    __statist_i_h_wts[0][1] = -3.06210078694971;
    __statist_i_h_wts[0][2] = 4.75609763115513;
    __statist_i_h_wts[0][3] = -0.686920960917446;
    __statist_i_h_wts[0][4] = 5.61393167310956;
    __statist_i_h_wts[0][5] = 0.26286684383775;
    __statist_i_h_wts[0][6] = -1.88027977523091;
    __statist_i_h_wts[1][0] = -4.94776489344622;
    __statist_i_h_wts[1][1] = 0.514466466516908;
    __statist_i_h_wts[1][2] = 2.41426272015869;
    __statist_i_h_wts[1][3] = 1.79148671162598;
    __statist_i_h_wts[1][4] = 6.49428097886501;
    __statist_i_h_wts[1][5] = 1.91409535168894;
    __statist_i_h_wts[1][6] = -4.13248033461812;
    __statist_i_h_wts[2][0] = -10.6737272446651;
    __statist_i_h_wts[2][1] = -1.12157162375972;
    __statist_i_h_wts[2][2] = 3.11469096886715;
    __statist_i_h_wts[2][3] = 3.3346666223024;
    __statist_i_h_wts[2][4] = 10.7870437897689;
    __statist_i_h_wts[2][5] = -2.23219215872911;
    __statist_i_h_wts[2][6] = -2.17900565891914;
    __statist_i_h_wts[3][0] = -4.12030670332737;
    __statist_i_h_wts[3][1] = -3.6355527525125;
    __statist_i_h_wts[3][2] = 0.63114578616507;
    __statist_i_h_wts[3][3] = 0.141774706332368;
    __statist_i_h_wts[3][4] = 2.37382802802028;
    __statist_i_h_wts[3][5] = 1.75617139633661;
    __statist_i_h_wts[3][6] = -3.32224862102589;
    __statist_i_h_wts[4][0] = -8.75297905861781;
    __statist_i_h_wts[4][1] = -6.82665487030775;
    __statist_i_h_wts[4][2] = 1.00349868661372;
    __statist_i_h_wts[4][3] = 1.21515990653671;
    __statist_i_h_wts[4][4] = 3.72307278754448;
    __statist_i_h_wts[4][5] = 2.18645442637678;
    __statist_i_h_wts[4][6] = -3.55301038984538;
    __statist_i_h_wts[5][0] = -2.1472068517427;
    __statist_i_h_wts[5][1] = -2.91385542946449;
    __statist_i_h_wts[5][2] = 2.18532499636953;
    __statist_i_h_wts[5][3] = -0.688403689930465;
    __statist_i_h_wts[5][4] = 3.99370311032431;
    __statist_i_h_wts[5][5] = 1.25040039746086;
    __statist_i_h_wts[5][6] = -3.70676128124038;
    __statist_i_h_wts[6][0] = -6.11801774471568;
    __statist_i_h_wts[6][1] = -0.615180839452578;
    __statist_i_h_wts[6][2] = 2.16187789660443;
    __statist_i_h_wts[6][3] = 1.99107271944964;
    __statist_i_h_wts[6][4] = 1.27194183158324;
    __statist_i_h_wts[6][5] = 4.29516537971104;
    __statist_i_h_wts[6][6] = -1.43260237361788;
    __statist_i_h_wts[7][0] = -4.85860866420066;
    __statist_i_h_wts[7][1] = -2.77931252688519;
    __statist_i_h_wts[7][2] = 0.250362708258909;
    __statist_i_h_wts[7][3] = 0.479172935892949;
    __statist_i_h_wts[7][4] = 3.31885210906112;
    __statist_i_h_wts[7][5] = 0.605031141895381;
    __statist_i_h_wts[7][6] = -3.08918842835974;
    __statist_i_h_wts[8][0] = -6.81990238166241;
    __statist_i_h_wts[8][1] = -3.61558468616775;
    __statist_i_h_wts[8][2] = -2.29045636029721;
    __statist_i_h_wts[8][3] = 2.21621876375043;
    __statist_i_h_wts[8][4] = 2.7136225908344;
    __statist_i_h_wts[8][5] = 1.86963147520933;
    __statist_i_h_wts[8][6] = -4.85821340247209;
    var __statist_h_o_wts = (function (dims) {
        var allocate = function (dims) {
            if (dims.length == 0) {
                return 0;
            }
            else {
                var array = [];
                for (var i = 0; i < dims[0]; i++) {
                    array.push(allocate(dims.slice(1)));
                }
                return array;
            }
        }; return allocate(dims);
    })([3, 9]);
    __statist_h_o_wts[0][0] = -2.21067330828496;
    __statist_h_o_wts[0][1] = 0.258144277354199;
    __statist_h_o_wts[0][2] = 0.246816209729445;
    __statist_h_o_wts[0][3] = -0.748521273545003;
    __statist_h_o_wts[0][4] = -2.2079349597815;
    __statist_h_o_wts[0][5] = 0.723334901343201;
    __statist_h_o_wts[0][6] = -1.23080298095657;
    __statist_h_o_wts[0][7] = 0.0719590473638152;
    __statist_h_o_wts[0][8] = 2.15437067876031;
    __statist_h_o_wts[1][0] = -2.11949272685727;
    __statist_h_o_wts[1][1] = -1.35875252430731;
    __statist_h_o_wts[1][2] = -0.221373752748364;
    __statist_h_o_wts[1][3] = -0.546675622139678;
    __statist_h_o_wts[1][4] = -0.37675502589441;
    __statist_h_o_wts[1][5] = 1.2961280603086;
    __statist_h_o_wts[1][6] = 0.331526091191588;
    __statist_h_o_wts[1][7] = -1.92905134495666;
    __statist_h_o_wts[1][8] = 1.81219298656603;
    __statist_h_o_wts[2][0] = 0.712694358817686;
    __statist_h_o_wts[2][1] = -2.13588602519793;
    __statist_h_o_wts[2][2] = -1.02778883185671;
    __statist_h_o_wts[2][3] = 3.23935164873324;
    __statist_h_o_wts[2][4] = -4.35295425671252;
    __statist_h_o_wts[2][5] = -1.18160644702338;
    __statist_h_o_wts[2][6] = 1.83089415709748;
    __statist_h_o_wts[2][7] = 0.961950448753475;
    __statist_h_o_wts[2][8] = 0.372848581847683;
    var __statist_hidden_bias = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    __statist_hidden_bias[0] = 3.97979353280168;
    __statist_hidden_bias[1] = 4.29889684230441;
    __statist_hidden_bias[2] = 6.45544945343994;
    __statist_hidden_bias[3] = 0.723959314589997;
    __statist_hidden_bias[4] = 2.30584366296102;
    __statist_hidden_bias[5] = 1.58227621337909;
    __statist_hidden_bias[6] = 4.19275748216097;
    __statist_hidden_bias[7] = 0.74807927371982;
    __statist_hidden_bias[8] = -0.23637221153106;
    var __statist_output_bias = [0, 0, 0];
    __statist_output_bias[0] = 0.0197612540649857;
    __statist_output_bias[1] = -0.0613934135970302;
    __statist_output_bias[2] = -0.161290857820845;
    var __statist_inputs = [0, 0, 0, 0, 0, 0, 0];
    var __statist_hidden = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var __statist_outputs = [0, 0, 0];
    __statist_outputs[0] = -1.0E307;
    __statist_outputs[1] = -1.0E307;
    __statist_outputs[2] = -1.0E307;
    __statist_inputs[0] = _Time__min__;
    __statist_inputs[1] = _Heart_rate__;
    if ((function (o1, o2) {
        if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        }
    })(_Gender__, "0")) {
        __statist_inputs[2] = 1;
    }
    else {
        __statist_inputs[2] = 0;
    }
    if ((function (o1, o2) {
        if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        }
    })(_Gender__, "1")) {
        __statist_inputs[3] = 1;
    }
    else {
        __statist_inputs[3] = 0;
    }
    if ((function (o1, o2) {
        if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        }
    })(_VO2max__, "40")) {
        __statist_inputs[4] = 1;
    }
    else {
        __statist_inputs[4] = 0;
    }
    if ((function (o1, o2) {
        if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        }
    })(_VO2max__, "60")) {
        __statist_inputs[5] = 1;
    }
    else {
        __statist_inputs[5] = 0;
    }
    if ((function (o1, o2) {
        if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        }
    })(_VO2max__, "80")) {
        __statist_inputs[6] = 1;
    }
    else {
        __statist_inputs[6] = 0;
    }
    var __statist_delta = 0;
    var __statist_maximum = 1;
    var __statist_minimum = 0;
    var __statist_ncont_inputs = 2;
    for (var __statist_i = 0; __statist_i < __statist_ncont_inputs; __statist_i++) {
        {
            __statist_delta = (__statist_maximum - __statist_minimum) / (__statist_max_input[__statist_i] - __statist_min_input[__statist_i]);
            __statist_inputs[__statist_i] = __statist_minimum - __statist_delta * __statist_min_input[__statist_i] + __statist_delta * __statist_inputs[__statist_i];
        }
        ;
    }
    var __statist_ninputs = 7;
    var __statist_nhidden = 9;
    for (var __statist_row = 0; __statist_row < __statist_nhidden; __statist_row++) {
        {
            __statist_hidden[__statist_row] = 0.0;
            for (var __statist_col = 0; __statist_col < __statist_ninputs; __statist_col++) {
                {
                    __statist_hidden[__statist_row] = __statist_hidden[__statist_row] + (__statist_i_h_wts[__statist_row][__statist_col] * __statist_inputs[__statist_col]);
                }
                ;
            }
            __statist_hidden[__statist_row] = __statist_hidden[__statist_row] + __statist_hidden_bias[__statist_row];
        }
        ;
    }
    for (var __statist_row = 0; __statist_row < __statist_nhidden; __statist_row++) {
        {
            if (__statist_hidden[__statist_row] > 100.0) {
                __statist_hidden[__statist_row] = 1.0;
            }
            else {
                if (__statist_hidden[__statist_row] < -100.0) {
                    __statist_hidden[__statist_row] = 0.0;
                }
                else {
                    __statist_hidden[__statist_row] = 1.0 / (1.0 + Math.exp(-__statist_hidden[__statist_row]));
                }
            }
        }
        ;
    }
    var __statist_noutputs = 3;
    for (var __statist_row2 = 0; __statist_row2 < __statist_noutputs; __statist_row2++) {
        {
            __statist_outputs[__statist_row2] = 0.0;
            for (var __statist_col2 = 0; __statist_col2 < __statist_nhidden; __statist_col2++) {
                {
                    __statist_outputs[__statist_row2] = __statist_outputs[__statist_row2] + (__statist_h_o_wts[__statist_row2][__statist_col2] * __statist_hidden[__statist_col2]);
                }
                ;
            }
            __statist_outputs[__statist_row2] = __statist_outputs[__statist_row2] + __statist_output_bias[__statist_row2];
        }
        ;
    }
    for (var __statist_row = 0; __statist_row < __statist_noutputs; __statist_row++) {
        {
            if (__statist_outputs[__statist_row] > 100.0) {
                __statist_outputs[__statist_row] = 1.0;
            }
            else {
                __statist_outputs[__statist_row] = Math.exp(__statist_outputs[__statist_row]);
            }
        }
        ;
    }
    __statist_delta = 0;
    for (var __statist_i = 0; __statist_i < __statist_noutputs; __statist_i++) {
        {
            __statist_delta = (__statist_maximum - __statist_minimum) / (__statist_max_target[__statist_i] - __statist_min_target[__statist_i]);
            __statist_outputs[__statist_i] = (__statist_outputs[__statist_i] - __statist_minimum + __statist_delta * __statist_min_target[__statist_i]) / __statist_delta;
        }
        ;
    }
    for (var __statist_ii = 0; __statist_ii < __statist_noutputs; __statist_ii++) {
        {
            // console.log(" Prediction_" + __statist_ii + " = " + __statist_outputs[__statist_ii]);

        }
        ;
    }

    return __statist_outputs[0];  // 2 - dophamine, 1 - adrenalin, 0 - noradrenalin
};