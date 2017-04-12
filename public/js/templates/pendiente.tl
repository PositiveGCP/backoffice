<div class="modal-content">
    <h3 class="center">Pendientes</h3>
    <div class="row">
        <div class="col s12">
            <h5>Agregar nuevas evalueciones pendientes:</h5>
            <br>
            <div class="input-field col s3">
                <input id="number" type="number" class="validate">
                <label for="number" data-error="wrong" data-success="right">Cantidad</label>
            </div>
            <div class="input-field col s7">
                <select id="emp">
                  <option value="empty" disabled selected>Selecciona</option>
                </select>
                <label>Empresa</label>
            </div>
            <div class="input-field col s2">
              <button class="btn btn-large waves-effect waves-light blue" id="new">Agregar
                <i class="material-icons right">send</i>
              </button>
            </div>
        </div>
    </div>
    <div class="row">
        <h5>Códigos de evaluación disponibles de:</h5>
        <div class="col s12 center">
            <ul class="center collection with-header" id="pendientes">
                <li class="collection-header">
                    <h5>Pendientes</h5></li>
            </ul>
        </div>
    </div>
</div>
<div class="modal-footer">
    <a href="#!" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</a>
</div>
