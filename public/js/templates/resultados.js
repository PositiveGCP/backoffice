(function(dust) {
    dust.register("inf", body_0);

    function body_0(chk, ctx) {
        return chk.s(ctx.get(["array"], false), ctx, {
            "block": body_1
        }, {});
    }
    body_0.__dustBody = !0;

    function body_1(chk, ctx) {
        return chk.w("<a id=\"id[").f(ctx.get(["id"], false), ctx, "h").w("]\" class=\"collection-item avatar\"><div class=\"col s12\"><div class=\"row valign-wrapper\"><div class=\"center\"><img src=\"").f(ctx.get(["image"], false), ctx, "h").w("\" class=\"circle materialboxed\" style=\"width: 42px;height: 42px;\"><br></div><div class=\"col s3\"><h6 class=\"title\">").f(ctx.get(["appa"], false), ctx, "h").w("</h6><h6>").f(ctx.get(["name"], false), ctx, "h").w("</h6></div><div class=\"col s3\"><h6 class=\"title\">").f(ctx.get(["inc"], false), ctx, "h").w("</h6><h6>Evaluador: ").f(ctx.get(["eval"], false), ctx, "h").w(", ").f(ctx.get(["date"], false), ctx, "h").w("</h6></div><div class=\"col s3 center\"><br><h4>").f(ctx.get(["res"], false), ctx, "h").w("</h4></div><div class=\"col s2\"><br><button class=\"btn-floating btn-large waves-effect waves-light blue\" onclick=\"reporte('").f(ctx.get(["per"], false), ctx, "h").w("')\"><i class=\"material-icons\">assessment</i></button></div></div></div></a>");
    }
    body_1.__dustBody = !0;

    function body_2(chk, ctx) {
        return chk.w("");
    }
    body_2.__dustBody = !0;

    function body_3(chk, ctx) {
        return chk.w("");
    }
    body_3.__dustBody = !0;
    return body_0
}(dust));
(function(dust) {
    dust.register("inc", body_0);

    function body_0(chk, ctx) {
        return chk.s(ctx.get(["array"], false), ctx, {
            "block": body_1
        }, {});
    }
    body_0.__dustBody = !0;

    function body_1(chk, ctx) {
        return chk.w("<a id=\"id[").f(ctx.get(["id"], false), ctx, "h").w("]\" class=\"collection-item avatar\"><div class=\"col s12\"><div class=\"row valign-wrapper\"><div class=\"center\"><img src=\"").f(ctx.get(["image"], false), ctx, "h").w("\" class=\"circle materialboxed\" style=\"width: 42px;height: 42px;\"></div><div class=\"col s3\"><h6 class=\"title\">").f(ctx.get(["name"], false), ctx, "h").w("</h6><h6>").f(ctx.get(["social"], false), ctx, "h").w("</h6></div><div class=\"col s3\"><h6>").f(ctx.get(["type"], false), ctx, "h").w("</h6><h6>").f(ctx.get(["pais"], false), ctx, "h").w("</h6></div><div class=\"col s3\"><h6 id=\"prom-res\">").f(ctx.get(["avg"], false), ctx, "h").w("</h6><h6></h6></div><div class=\"col s2 center\"><button type=\"button\" id=\"").f(ctx.get(["id"], false), ctx, "h").w("\" class=\"center btn-floating btn-large waves-effect waves-light blue\"><i class=\"material-icons\">trending_up</i></button></div></div></div></a>");
    }
    body_1.__dustBody = !0;
    return body_0
}(dust));
