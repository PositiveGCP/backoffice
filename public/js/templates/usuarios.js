(function(dust) {
    dust.register("altUsr", body_0);

    function body_0(chk, ctx) {
        return chk.w("<div class=\"modal-content\" id=\"modal-cont\"><div class=\"row\"><div class=\"col s12\"><form class=\"col s12\"><h3 class=\"center\">Alta de Usuario</h3><div class=\"input-field col s12 left\"><i class=\"material-icons prefix\">account_circle</i><input id=\"name\" type=\"text\" class=\"validate\"><label for=\"name\" >Nombre</label></div><div class=\"input-field col s5 left\"><i class=\"material-icons prefix\">account_circle</i><input id=\"appat\" type=\"text\" class=\"validate\"><label for=\"appat\" >Apellido Paterno</label></div><div class=\"input-field col s5 left\"><i class=\"material-icons prefix\">account_circle</i><input id=\"apmat\" type=\"text\" class=\"validate\"><label for=\"apmat\" >Apellido Materno</label></div><div class=\"col s1\"><label for=\"group1\">Genero</label><br><br><input name=\"group1\" type=\"radio\" id=\"male\"/><label for=\"male\">Masculino</label></div><div class=\"col s1\"><br><br><input name=\"group1\" type=\"radio\" id=\"female\"/><label for=\"female\">Femenino</label></div><div class=\"file-field input-field col s12\"><div class=\"btn\"><span>Fotografía</span><input type=\"file\" multiple id=\"photo\"></div><div class=\"file-path-wrapper\"><input class=\"file-path validate\" type=\"text\" placeholder=\"1000*1000 px\"></div></div><div class=\"input-field col s6 left\"><i class=\"material-icons prefix\">email</i><input id=\"email\" type=\"email\" class=\"validate\"><label for=\"email\" >Correo Electronico</label></div><div class=\"input-field col s6 left\"><i class=\"material-icons prefix\">vpn_key</i><input id=\"password\" type=\"password\" class=\"validate\"><label for=\"password\" >Password</label></div><div class=\"input-field col s6 left\"><select id=\"tipo\"><option value=\"empty\" disabled selected>Selecciona el tipo</option></select><label>Tipo de usuario</label></div><div class=\"input-field col s6 left\"><select id=\"emp\"><option value=\"empty\" disabled selected>Selecciona la empresa</option></select><label>Empresa</label></div></form></div></div></div><div class=\"modal-footer\"><a id=\"altBtn\" class=\"modal-action modal-close waves-effect waves-green btn-flat\" onclick=\"userData('new')\">Alta</a></div>");
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
        return chk.w("<div class=\"col s12\"><div class=\"row valign-wrapper\"><div><img src=\"").f(ctx.get(["image"], false), ctx, "h").w("\" class=\"circle materialboxed\" width=\"650\"><br></div><div class=\"col s2\"><br><h6 class=\"title\">").f(ctx.get(["appat"], false), ctx, "h").w(" ").f(ctx.get(["apmat"], false), ctx, "h").w("</h6><h6>").f(ctx.get(["name"], false), ctx, "h").w("</h6></div><div class=\"col s4\"><br><h6>").f(ctx.get(["email"], false), ctx, "h").w("</h6></div><div class=\"col s3\"><br><h6>").f(ctx.get(["empresa"], false), ctx, "h").w("</h6></div><div class=\"col s1\"><br><h6>").f(ctx.get(["type"], false), ctx, "h").w("</h6></div><div class=\"col s1 center\"><br><button type=\"button\" id=\"").f(ctx.get(["id"], false), ctx, "h").w("\" data-target=\"modal1\" class=\"btn-floating btn-large waves-effect waves-light red\"><i class=\"material-icons\">mode_edit</i></button><br></div></div></div>");
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
        return chk.w("<div class=\"modal-content\"><h3>Modificar Usuarios</h3><p>Modificar datos?</p></div><div class=\"modal-footer\"><a class=\" modal-action modal-close waves-effect waves-green btn-flat\" onclick=\"doIt('view')\">Continua</a><a class=\" modal-action modal-close waves-effect waves-red btn-flat\" onclick=\"mayNot()\">Cancelar</a></div>");
    }
    body_2.__dustBody = !0;

    function body_3(chk, ctx) {
        return chk.w("<div class=\"modal-content\"><h3>Te va a costar</h3><p>El alta de usuarios tiene condiciones:</p></div><div class=\"modal-footer\"><a class=\" modal-action modal-close waves-effect waves-green btn-flat\" onclick=\"doIt('new')\">Continua</a><a class=\" modal-action modal-close waves-effect waves-red btn-flat\" onclick=\"mayNot()\">Cancelar</a></div>");
    }
    body_3.__dustBody = !0;

    function body_4(chk, ctx) {
        return chk.w("<div class=\"modal-content\"><h3>El costo no desaparece</h3><p>Hay condiciones para eliminar:</p></div><div class=\"modal-footer\"><a class=\" modal-action modal-close waves-effect waves-green btn-flat\" onclick=\"doIt('kill')\">Continua</a><a class=\" modal-action modal-close waves-effect waves-red btn-flat\" onclick=\"mayNot()\">Cancelar</a></div>");
    }
    body_4.__dustBody = !0;
    return body_0
}(dust));
(function(dust) {
    dust.register("modUsr", body_0);

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
        }, {}).w("<div class=\"file-field input-field col s6\"><div class=\"btn\"><span>Fotografía</span><input type=\"file\" multiple id=\"photo\"></div><div class=\"file-path-wrapper\"><input id=\"txt_photo\" class=\"file-path validate\" type=\"text\" placeholder=\"1000*1000 px\"></div></div><div class=\"input-field col s6 left\"><i class=\"material-icons prefix\">email</i><input disabled id=\"email\" type=\"email\" class=\"validate\" value=\"").f(ctx.get(["email"], false), ctx, "h").w("\"><label for=\"email\" class=\"active\">Correo Electronico</label></div><div class=\"col s12 left\"><div class=\"input-field col s6 left\"><select id=\"tipo\"><option value=\"empty\" disabled selected>Selecciona el tipo</option></select><label>Tipo de usuario</label></div><div class=\"input-field col s6 left\"><select id=\"emp\"><option value=\"empty\" disabled selected>Selecciona la empresa</option></select><label>Empresa</label></div></div></form></div></div></div><div class=\"modal-footer\"><a id=\"modBtn\" class=\"modal-action modal-close waves-effect waves-green btn-flat\" onclick=\"userData('").f(ctx.get(["id"], false), ctx, "h").w("')\">Modificar</a><!--<a id=\"kllBtn\" class=\"modal-action modal-close waves-effect waves-red btn-flat\" onclick=\"killData('").f(ctx.get(["id"], false), ctx, "h").w("')\">Eliminar</a>--></div>");
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
    return body_0
}(dust));
(function(dust) {
    dust.register("user", body_0);

    function body_0(chk, ctx) {
        return chk.s(ctx.get(["array"], false), ctx, {
            "block": body_1
        }, {});
    }
    body_0.__dustBody = !0;

    function body_1(chk, ctx) {
        return chk.w("<a class=\"collection-item avatar\" id=\"id[").f(ctx.get(["id"], false), ctx, "h").w("]\"><div class=\"col s12\"><div class=\"row valign-wrapper\"><div><img src=\"").f(ctx.get(["image"], false), ctx, "h").w("\" class=\"circle materialboxed\" width=\"650\"><br></div><div class=\"col s2\"><br><h6 class=\"title\">").f(ctx.get(["appat"], false), ctx, "h").w(" ").f(ctx.get(["apmat"], false), ctx, "h").w("</h6><h6>").f(ctx.get(["name"], false), ctx, "h").w("</h6></div><div class=\"col s4\"><br><h6>").f(ctx.get(["email"], false), ctx, "h").w("</h6></div><div class=\"col s3\"><br><h6>").f(ctx.get(["empresa"], false), ctx, "h").w("</h6></div><div class=\"col s1\"><br><h6>").f(ctx.get(["type"], false), ctx, "h").w("</h6></div><div class=\"col s1 center\"><br><button type=\"button\" id=\"").f(ctx.get(["id"], false), ctx, "h").w("\" data-target=\"modal1\" class=\"btn-floating btn-large waves-effect waves-light red\"><i class=\"material-icons\">mode_edit</i></button><br></div></div></div></a>");
    }
    body_1.__dustBody = !0;
    return body_0
}(dust));
