(function(dust){dust.register("account",body_0);function body_0(chk,ctx){return chk.s(ctx.get(["array"], false),ctx,{"block":body_1},{});}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<a id=\"id[").f(ctx.get(["id"], false),ctx,"h").w("]\" class=\"collection-item avatar\"><div class=\"col s12\"><div class=\"row valign-wrapper\"><div class=\"center\"><img src=\"").f(ctx.get(["image"], false),ctx,"h").w("\" class=\"circle materialboxed\" style=\"width: 42px;height: 42px;\"><br></div><div class=\"col s2\"><br><h6 class=\"title\">").f(ctx.get(["name"], false),ctx,"h").w("</h6><h6>").f(ctx.get(["social"], false),ctx,"h").w("</h6></div><div class=\"col s4\"><br><h6 class=\"title\">").f(ctx.get(["pais"], false),ctx,"h").w("</h6><h6>").f(ctx.get(["loc"], false),ctx,"h").w("</h6></div><div class=\"col s3\"><br><h6>").f(ctx.get(["type"], false),ctx,"h").w("</h6><h6></h6></div><div class=\"col s2 center\"><br><button type=\"button\" id=\"").f(ctx.get(["id"], false),ctx,"h").w("\" data-target=\"modal1\" class=\"center btn-floating btn-large waves-effect waves-light red\"><i class=\"material-icons\">mode_edit</i></button><br></div></div></div></a>");}body_1.__dustBody=!0;return body_0}(dust));
(function(dust){dust.register("altCta",body_0);function body_0(chk,ctx){return chk.w("<div class=\"modal-content\" id=\"modal-cont\"><div class=\"row\"><div class=\"col s12\"><form class=\"col s12\"><h3 class=\"center\">Alta de Cuenta</h3><div class=\"input-field col s12 left\"><i class=\"material-icons prefix\">work</i><input id=\"name\" type=\"text\" class=\"validate\"><label for=\"name\">Nombre Comercial</label></div><div class=\"input-field col s6 left\"><i class=\"material-icons prefix\">work</i><input id=\"social\" type=\"text\" class=\"validate\"><label for=\"social\">Razon Social</label></div><div class=\"input-field col s6 left\"><i class=\"material-icons prefix\">work</i><input id=\"iden\" type=\"text\" class=\"validate\"><label for=\"iden\">Registro Federal</label></div><div class=\"file-field input-field col s12\" id=\"logotipo\"><div class=\"btn\"><span>Logotipo</span><input type=\"file\" multiple id=\"logo\"></div><div class=\"file-path-wrapper\"><input class=\"file-path validate\" type=\"text\" placeholder=\"1000*1000 px\" id=\"txt_logo\"></div></div><div class=\"input-field col s6 left\"><select id=\"pais\"><option value=\"empty\" disabled selected>Selecciona el Pais</option></select><label>Pais</label></div><div class=\"input-field col s6 left\"><select id=\"local\" multiple><option value=\"empty\" disabled selected>Selecciona las Localidades</option></select><label>Localidades</label></div><div id=\"user\"><h3 class=\"center\">Usuario Principal</h3><div class=\"input-field col s12 left\"><i class=\"material-icons prefix\">account_circle</i><input id=\"name\" type=\"text\" class=\"validate\"><label for=\"name\" >Nombre</label></div><div class=\"input-field col s5 left\"><i class=\"material-icons prefix\">account_circle</i><input id=\"appat\" type=\"text\" class=\"validate\"><label for=\"appat\" >Apellido Paterno</label></div><div class=\"input-field col s5 left\"><i class=\"material-icons prefix\">account_circle</i><input id=\"apmat\" type=\"text\" class=\"validate\"><label for=\"apmat\" >Apellido Materno</label></div><div class=\"col s1\"><label for=\"group1\">Genero</label><br><br><input name=\"group1\" type=\"radio\" id=\"male\"/><label for=\"male\">Masculino</label></div><div class=\"col s1\"><br><br><input name=\"group1\" type=\"radio\" id=\"female\"/><label for=\"female\">Femenino</label></div><div class=\"file-field input-field col s12\"><div class=\"btn\"><span>Fotografía</span><input type=\"file\" multiple id=\"photo\"></div><div class=\"file-path-wrapper\"><input class=\"file-path validate\" type=\"text\" placeholder=\"1000*1000 px\"></div></div><div class=\"input-field col s6 left\"><i class=\"material-icons prefix\">email</i><input id=\"email\" type=\"email\" class=\"validate\"><label for=\"email\" >Correo Electronico</label></div><div class=\"input-field col s6 left\"><i class=\"material-icons prefix\">vpn_key</i><input id=\"password\" type=\"password\" class=\"validate\"><label for=\"password\" >Password</label></div></div></form></div></div></div><div class=\"modal-footer\"><a id=\"altBtn\" class=\"modal-action modal-close waves-effect waves-green btn-flat\" onclick=\"newAcc()\">Alta</a></div>");}body_0.__dustBody=!0;return body_0}(dust));
(function(dust){dust.register("modCta",body_0);function body_0(chk,ctx){return chk.s(ctx.get(["array"], false),ctx,{"block":body_1},{});}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<div class=\"modal-content\" id=\"modal-cont\"><div class=\"row\"><div class=\"col s12\"><form class=\"col s12\"><h3 class=\"center\">Modificar información de ").f(ctx.get(["name"], false),ctx,"h").w("</h3><div class=\"input-field col s12 left\"><i class=\"material-icons prefix\">work</i><input id=\"name\" type=\"text\" class=\"validate\" value=\"").f(ctx.get(["name"], false),ctx,"h").w("\"><label for=\"name\" class=\"active\">Nombre Comercial</label></div><div class=\"input-field col s6 left\"><i class=\"material-icons prefix\">work</i><input id=\"social\" type=\"text\" class=\"validate\" value=\"").f(ctx.get(["social"], false),ctx,"h").w("\"><label for=\"social\" class=\"active\">Razon Social</label></div><div class=\"input-field col s6 left\"><i class=\"material-icons prefix\">work</i><input id=\"iden\" type=\"text\" class=\"validate\" value=\"").f(ctx.get(["ide"], false),ctx,"h").w("\"><label for=\"iden\" class=\"active\">Registro Federal</label></div><div class=\"file-field input-field col s12\"><div class=\"btn\"><span>Logotipo</span><input type=\"file\" multiple id=\"logo\"></div><div class=\"file-path-wrapper\"><input class=\"file-path validate\" type=\"text\" id=\"txt_logo\" placeholder=\"1000*1000 px\"></div></div><div class=\"input-field col s6 left\"><select id=\"pais\"><option value=\"empty\" disabled selected>Selecciona el Pais</option></select><label>Pais</label></div><div class=\"input-field col s6 left\"><select id=\"local\" multiple><option value=\"empty\" disabled selected>Selecciona las Localidades</option></select><label>Localidades</label></div></form></div></div></div><div class=\"modal-footer\"><a id=\"modBtn\" class=\"modal-action modal-close waves-effect waves-green btn-flat\" onclick=\"modAcc('").f(ctx.get(["id"], false),ctx,"h").w("')\">Modificar</a><!--<a id=\"kllBtn\" class=\"modal-action modal-close waves-effect waves-red btn-flat\" onclick=\"killAcc('").f(ctx.get(["id"], false),ctx,"h").w("')\">Eliminar</a>--></div>");}body_1.__dustBody=!0;return body_0}(dust));
(function(dust){dust.register("cont",body_0);function body_0(chk,ctx){return chk.s(ctx.get(["array"], false),ctx,{"block":body_1},{});}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<div class=\"col s12\"><div class=\"row valign-wrapper\"><div class=\"center\"><img src=\"").f(ctx.get(["image"], false),ctx,"h").w("\" class=\"circle materialboxed\" style=\"width: 42px;height: 42px;\"><br></div><div class=\"col s2\"><br><h6 class=\"title\">").f(ctx.get(["name"], false),ctx,"h").w("</h6><h6>").f(ctx.get(["social"], false),ctx,"h").w("</h6></div><div class=\"col s4\"><br><h6 class=\"title\">").f(ctx.get(["pais"], false),ctx,"h").w("</h6><h6>").f(ctx.get(["loc"], false),ctx,"h").w("</h6></div><div class=\"col s3\"><br><h6>").f(ctx.get(["type"], false),ctx,"h").w("</h6><h6></h6></div><div class=\"col s2 center\"><br><button type=\"button\" id=\"").f(ctx.get(["id"], false),ctx,"h").w("\" data-target=\"modal1\" class=\"center btn-floating btn-large waves-effect waves-light red\"><i class=\"material-icons\">mode_edit</i></button><br></div></div></div>");}body_1.__dustBody=!0;return body_0}(dust));
(function(dust){dust.register("cost",body_0);function body_0(chk,ctx){return chk.s(ctx.get(["array"], false),ctx,{"block":body_1},{});}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.h("eq",ctx,{"block":body_2},{"key":ctx.get(["type"], false),"value":"view"},"h").h("eq",ctx,{"block":body_3},{"key":ctx.get(["type"], false),"value":"new"},"h").h("eq",ctx,{"block":body_4},{"key":ctx.get(["type"], false),"value":"kill"},"h");}body_1.__dustBody=!0;function body_2(chk,ctx){return chk.w("<div class=\"modal-content\"><h3>Modificar Cuentas</h3><p>Esta seguro de modificar los datos de esta cuenta?</p></div><div class=\"modal-footer\"><a class=\" modal-action modal-close waves-effect waves-green btn-flat\" onclick=\"doIt('view')\">Continua</a><a class=\" modal-action modal-close waves-effect waves-red btn-flat\" onclick=\"mayNot()\">Cancelar</a></div>");}body_2.__dustBody=!0;function body_3(chk,ctx){return chk.w("<div class=\"modal-content\"><h3>Alta de Cuentas</h3><p>El alta de Cuentas tendra repercusiones de tipo financieras.</p></div><div class=\"modal-footer\"><a class=\" modal-action modal-close waves-effect waves-green btn-flat\" onclick=\"doIt('new')\">Continua</a><a class=\" modal-action modal-close waves-effect waves-red btn-flat\" onclick=\"mayNot()\">Cancelar</a></div>");}body_3.__dustBody=!0;function body_4(chk,ctx){return chk.w("<div class=\"modal-content\"><h3>El costo no desaparece</h3><p>Hay condiciones para eliminar:</p></div><div class=\"modal-footer\"><a class=\" modal-action modal-close waves-effect waves-green btn-flat\" onclick=\"doIt('kill')\">Continua</a><a class=\" modal-action modal-close waves-effect waves-red btn-flat\" onclick=\"mayNot()\">Cancelar</a></div>");}body_4.__dustBody=!0;return body_0}(dust));