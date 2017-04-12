(function(dust) {
    dust.register("altPer", body_0);

    function body_0(chk, ctx) {
        return chk.w("<div class=\"modal-content\" id=\"modal-cont\"><div class=\"row\"><div class=\"col s12\"><form class=\"col s12\"><h3 class=\"center\">Alta Personas</h3><div class=\"input-field col s12 left\"><i class=\"material-icons prefix\">account_circle</i><input id=\"name\" type=\"text\" class=\"validate\"><label for=\"name\" >Nombre</label></div><div class=\"input-field col s5 left\"><i class=\"material-icons prefix\">account_circle</i><input id=\"appat\" type=\"text\" class=\"validate\"><label for=\"appat\" >Apellido Paterno</label></div><div class=\"input-field col s5 left\"><i class=\"material-icons prefix\">account_circle</i><input id=\"apmat\" type=\"text\" class=\"validate\"><label for=\"apmat\" >Apellido Materno</label></div><div class=\"col s1\"><label for=\"group1\">Genero</label><br><br><input name=\"group1\" type=\"radio\" id=\"male\"/><label for=\"male\">Masculino</label></div><div class=\"col s1\"><br><br><input name=\"group1\" type=\"radio\" id=\"female\"/><label for=\"female\">Femenino</label></div><div class=\"file-field input-field col s12\"><div class=\"btn\"><span>Fotografía</span><input type=\"file\" multiple id=\"photo\"></div><div class=\"file-path-wrapper\"><input id=\"txt_photo\" class=\"file-path validate\" type=\"text\" placeholder=\"1000*1000 px\"></div></div><div class=\"input-field col s6 left\"><i class=\"material-icons prefix\">perm_identity</i><input id=\"rfc\" type=\"text\" class=\"validate\"><label for=\"rfc\" >RFC</label></div><div class=\"input-field col s6 left\"><select id=\"emp\"><option value=\"empty\" disabled selected>Selecciona la empresa</option></select><label>Empresa</label></div><div class=\"input-field col s6 left\"><i class=\"material-icons prefix\">email</i><input id=\"email\" type=\"email\" class=\"validate\"><label for=\"email\" >Correo Electronico</label></div><div class=\"input-field col s6 left\"><i class=\"material-icons prefix\">phone</i><input id=\"phone\" type=\"text\" class=\"validate\"><label for=\"phone\" >Telefono</label></div><div class=\"input-field col s6 left\"><i class=\"material-icons prefix\">supervisor_account</i><input id=\"puesto\" type=\"text\" class=\"validate\"><label for=\"puesto\" >Puesto</label></div><div class=\"input-field col s6\"><select id=\"disp\"><option value=\"Si\">Si</option><option value=\"No\">No</option></select><label>Comunidad Positive</label></div></form></div></div></div><div class=\"modal-footer\"><a id=\"altBtn\" class=\"modal-action modal-close waves-effect waves-green btn-flat\" onclick=\"personData('null')\">Alta</a></div>");
    }
    body_0.__dustBody = !0;
    return body_0
}(dust));
(function(dust) {
    dust.register("cont", body_0);

    function body_0(chk, ctx) {
        return chk.s(ctx.get(["array"], false), ctx, {
            "block": body_1
        }, {});
    }
    body_0.__dustBody = !0;

    function body_1(chk, ctx) {
        return chk.w("<div class=\"col s12\"><div class=\"row valign-wrapper\"><div><img src=\"").f(ctx.get(["image"], false), ctx, "h").w("\" class=\"circle materialboxed\" width=\"650\"><br></div><div class=\"col s2\"><br><h6 class=\"title\">").f(ctx.get(["appat"], false), ctx, "h").w(" ").f(ctx.get(["apmat"], false), ctx, "h").w("</h6><h6>").f(ctx.get(["name"], false), ctx, "h").w("</h6></div><div class=\"col s3\"><br><h6>").f(ctx.get(["tel"], false), ctx, "h").w("</h6><h6> ").f(ctx.get(["email"], false), ctx, "h").w("</h6></div><div class=\"col s3\"><br><h6>").f(ctx.get(["empresa"], false), ctx, "h").w(", ").f(ctx.get(["puesto"], false), ctx, "h").w("</h6><h6>Comunidad Positive: ").f(ctx.get(["dispon"], false), ctx, "h").w("</h6></div><div class=\"col s2\"><br><h6 id=\"per-res\"> ").f(ctx.get(["prom"], false), ctx, "h").w("</h6><h6>").f(ctx.get(["last"], false), ctx, "h").w("</h6></div><div class=\"col s1 center\"><br><button type=\"button\" id=\"").f(ctx.get(["id"], false), ctx, "h").w("\" data-target=\"modal1\" class=\"btn-floating btn-large waves-effect waves-light red\"><i class=\"material-icons\">mode_edit</i></button><br></div></div></div>");
    }
    body_1.__dustBody = !0;
    return body_0
}(dust));
(function(dust) {
    dust.register("cost", body_0);

    function body_0(chk, ctx) {
        return chk.s(ctx.get(["array"], false), ctx, {
            "block": body_1
        }, {});
    }
    body_0.__dustBody = !0;

    function body_1(chk, ctx) {
        return chk.h("eq", ctx, {
            "block": body_2
        }, {
            "key": ctx.get(["type"], false),
            "value": "view"
        }, "h").h("eq", ctx, {
            "block": body_3
        }, {
            "key": ctx.get(["type"], false),
            "value": "new"
        }, "h").h("eq", ctx, {
            "block": body_4
        }, {
            "key": ctx.get(["type"], false),
            "value": "kill"
        }, "h");
    }
    body_1.__dustBody = !0;

    function body_2(chk, ctx) {
        return chk.w("<div class=\"modal-content\"><h3>Modificar personas</h3><p>Modificar datos?</p></div><div class=\"modal-footer\"><a class=\" modal-action modal-close waves-effect waves-green btn-flat\" onclick=\"doIt('view')\">Continua</a><a class=\" modal-action modal-close waves-effect waves-red btn-flat\" onclick=\"mayNot()\">Cancelar</a></div>");
    }
    body_2.__dustBody = !0;

    function body_3(chk, ctx) {
        return chk.w("<div class=\"modal-content\"><h3>Te va a costar</h3><p>El alta de personas tiene un costo a continuacion descrito:</p></div><div class=\"modal-footer\"><a class=\" modal-action modal-close waves-effect waves-green btn-flat\" onclick=\"doIt('new')\">Continua</a><a class=\" modal-action modal-close waves-effect waves-red btn-flat\" onclick=\"mayNot()\">Cancelar</a></div>");
    }
    body_3.__dustBody = !0;

    function body_4(chk, ctx) {
        return chk.w("<div class=\"modal-content\"><h3>El costo no desaparecd</h3><p>Hay condiciones para eliminar:</p></div><div class=\"modal-footer\"><a class=\" modal-action modal-close waves-effect waves-green btn-flat\" onclick=\"doIt('kill')\">Continua</a><a class=\" modal-action modal-close waves-effect waves-red btn-flat\" onclick=\"mayNot()\">Cancelar</a></div>");
    }
    body_4.__dustBody = !0;
    return body_0
}(dust));
(function(dust) {
    dust.register("modPer", body_0);

    function body_0(chk, ctx) {
        return chk.s(ctx.get(["array"], false), ctx, {
            "block": body_1
        }, {});
    }
    body_0.__dustBody = !0;

    function body_1(chk, ctx) {
        return chk.w("<div class=\"modal-content\" id=\"modal-cont\"><div class=\"row\"><div class=\"col s12\"><form class=\"col s12\"><h3 class=\"center\">Modificar Información de ").f(ctx.get(["name"], false), ctx, "h").w(" ").f(ctx.get(["appat"], false), ctx, "h").w("</h3><div class=\"input-field col s12 left\"><i class=\"material-icons prefix\">account_circle</i><input id=\"name\" type=\"text\" class=\"validate\" value=\"").f(ctx.get(["name"], false), ctx, "h").w("\"><label for=\"name\" class=\"active\">Nombre</label></div><div class=\"input-field col s5 left\"><i class=\"material-icons prefix\">account_circle</i><input id=\"appat\" type=\"text\" class=\"validate\" value=\"").f(ctx.get(["appat"], false), ctx, "h").w("\"><label for=\"appat\" class=\"active\">Apellido Paterno</label></div><div class=\"input-field col s5 left\"><i class=\"material-icons prefix\">account_circle</i><input id=\"apmat\" type=\"text\" class=\"validate\" value=\"").f(ctx.get(["apmat"], false), ctx, "h").w("\"><label for=\"apmat\" class=\"active\">Apellido Materno</label></div>").nx(ctx.get(["male"], false), ctx, {
            "else": body_2,
            "block": body_3
        }, {}).w("<div class=\"file-field input-field col s12\"><div class=\"btn\"><span>Fotografía</span><input type=\"file\" multiple id=\"photo\"></div><div class=\"file-path-wrapper\"><input id=\"txt_photo\" class=\"file-path validate\" type=\"text\" placeholder=\"1000*1000 px\"></div></div><div class=\"input-field col s6 left\"><i class=\"material-icons prefix\">perm_identity</i><input id=\"rfc\" type=\"text\" class=\"validate\" value=\"").f(ctx.get(["rfc"], false), ctx, "h").w("\"><label for=\"rfc\" class=\"active\">RFC</label></div><div class=\"input-field col s6 left\"><select id=\"emp\"><option value=\"empty\" disabled selected>Selecciona la empresa</option></select><label>Empresa</label></div><div class=\"input-field col s6 left\"><i class=\"material-icons prefix\">email</i><input id=\"email\" type=\"email\" class=\"validate\" value=\"").f(ctx.get(["email"], false), ctx, "h").w("\"><label for=\"email\" class=\"active\">Correo Electronico</label></div><div class=\"input-field col s6 left\"><i class=\"material-icons prefix\">phone</i><input id=\"phone\" type=\"text\" class=\"validate\" value=\"").f(ctx.get(["tel"], false), ctx, "h").w("\"><label for=\"phone\" class=\"active\">Telefono</label></div><div class=\"input-field col s6 left\"><i class=\"material-icons prefix\">supervisor_account</i><input id=\"puesto\" type=\"text\" class=\"validate\" value=\"").f(ctx.get(["puesto"], false), ctx, "h").w("\"><label for=\"puesto\" class=\"active\">Puesto</label></div>").nx(ctx.get(["disp"], false), ctx, {
            "else": body_4,
            "block": body_5
        }, {}).w("</form></div></div></div><div class=\"modal-footer\"><a id=\"modBtn\" class=\"modal-action modal-close waves-effect waves-green btn-flat\" onclick=\"personData('").f(ctx.get(["id"], false), ctx, "h").w("')\">Modificar</a><!--<a id=\"modBtn\" class=\"modal-action modal-close waves-effect waves-red btn-flat\" onclick=\"killData('").f(ctx.get(["id"], false), ctx, "h").w("')\">Eliminar</a>--></div>");
    }
    body_1.__dustBody = !0;

    function body_2(chk, ctx) {
        return chk.w("<div class=\"col s1\"><label for=\"group1\">Genero</label><br><br><input name=\"group1\" type=\"radio\" id=\"male\" checked/><label for=\"male\">Masculino</label></div><div class=\"col s1\"><br><br><input name=\"group1\" type=\"radio\" id=\"female\"/><label for=\"female\">Femenino</label></div>");
    }
    body_2.__dustBody = !0;

    function body_3(chk, ctx) {
        return chk.w("<div class=\"col s1\"><label for=\"group1\">Genero</label><br><br><input name=\"group1\" type=\"radio\" id=\"male\"/><label for=\"male\">Masculino</label></div><div class=\"col s1\"><br><br><input name=\"group1\" type=\"radio\" id=\"female\" checked/><label for=\"female\">Femenino</label></div>");
    }
    body_3.__dustBody = !0;

    function body_4(chk, ctx) {
        return chk.w("<div class=\"input-field col s6\"><select id=\"disp\"><option value=\"Si\" selected>Si</option><option value=\"No\">No</option></select><label>Comunidad Positive</label></div>");
    }
    body_4.__dustBody = !0;

    function body_5(chk, ctx) {
        return chk.w("<div class=\"input-field col s6\"><select id=\"disp\"><option value=\"Si\">Si</option><option value=\"No\" selected>No</option></select><label>Comunidad Positive</label></div>");
    }
    body_5.__dustBody = !0;
    return body_0
}(dust));
(function(dust) {
    dust.register("massPer", body_0);

    function body_0(chk, ctx) {
        return chk.w("<div class=\"modal-content\"><h3 class=\"center\">Alta desde archivo csv</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><br><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><br><div class=\"file-field input-field col s12\"><div class=\"btn\"><span>Archivo .csv</span><input type=\"file\" multiple id=\"arc\"></div><div class=\"file-path-wrapper\"><input class=\"file-path validate\" type=\"text\" placeholder=\"1000*1000 px\"></div></div></div><div class=\"modal-footer\"><a id=\"altBtn\" class=\"modal-action modal-close waves-effect waves-green btn-flat\">Enviar<i class=\"material-icons right\">send</i></a></div>");
    }
    body_0.__dustBody = !0;
    return body_0
}(dust));
(function(dust) {
    dust.register("person", body_0);

    function body_0(chk, ctx) {
        return chk.s(ctx.get(["array"], false), ctx, {
            "block": body_1
        }, {});
    }
    body_0.__dustBody = !0;

    function body_1(chk, ctx) {
        return chk.w("<a class=\"collection-item avatar\" id=\"id[").f(ctx.get(["id"], false), ctx, "h").w("]\"><div class=\"col s12\"><div class=\"row valign-wrapper\"><div><img src=\"").f(ctx.get(["image"], false), ctx, "h").w("\" class=\"circle materialboxed\" width=\"650\"><br></div><div class=\"col s2\"><br><h6 class=\"title\">").f(ctx.get(["appat"], false), ctx, "h").w(" ").f(ctx.get(["apmat"], false), ctx, "h").w("</h6><h6>").f(ctx.get(["name"], false), ctx, "h").w("</h6></div><div class=\"col s3\"><br><h6>").f(ctx.get(["tel"], false), ctx, "h").w("</h6><h6>").f(ctx.get(["email"], false), ctx, "h").w("</h6></div><div class=\"col s3\"><br><h6>").f(ctx.get(["empresa"], false), ctx, "h").w(", ").f(ctx.get(["puesto"], false), ctx, "h").w("</h6><h6>Comunidad Positive: ").f(ctx.get(["dispon"], false), ctx, "h").w("</h6></div><div class=\"col s2\"><br><h6 id=\"per-res2\">").f(ctx.get(["prom"], false), ctx, "h").w("</h6><h6>").f(ctx.get(["last"], false), ctx, "h").w("</h6></div><div class=\"col s1 center\"><br><button type=\"button\" id=\"").f(ctx.get(["id"], false), ctx, "h").w("\" data-target=\"modal1\" class=\"btn-floating btn-large waves-effect waves-light red\"><i class=\"material-icons\">mode_edit</i></button><br></div></div></div></a>");
    }
    body_1.__dustBody = !0;
    return body_0
}(dust));
