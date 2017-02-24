{!- Barra de navegación -!}
<div class="navigation">
  <ul id="barra-lateral" class="side-nav">
    {#currentUser}
    <li>
      <div class="userView">
        <img class="circle" src="{prof_pic}">
        <h5 class="white-text name">{name} <strong>{flast_na}</strong></h5>
        <span class="white-text email">{email}</span>
        <p class="white-text"><strong>{company}</strong></p>
      </div>
    </li> <br>
    {/currentUser}
    <li><div class="divider"></div></li>

    <div id="content-li">
      {#dataPermissions}
        <li class="no-padding">
        <ul class="collapsible collapsible-accordion">
          <li>
            <a class="collapsible-header waves-effect waves-blue"><i class="material-icons">settings</i>Operaciones</a>
            <div class="collapsible-body">
              <ul>
                {#operaciones}
                  <li><a href="/{.}"><i class="material-icons">keyboard_arrow_right</i> {.}</a></li>
                {/operaciones}
              </ul>
            </div>
          </li>
        </ul>
      </li>
      <div id="content-li">
        <li class="no-padding">
        <ul class="collapsible collapsible-accordion">
          <li>
            <a class="collapsible-header waves-effect waves-blue"><i class="material-icons">info_outline</i>Información</a>
            <div class="collapsible-body">
              <ul>
                {#informacion}
                  <li><a href="/{.}"><i class="material-icons">keyboard_arrow_right</i> {.}</a></li>
                {/informacion}
              </ul>
            </div>
          </li>
        </ul>
      </li>
      <div id="content-li">
        <li class="no-padding">
        <ul class="collapsible collapsible-accordion">
          <li>
            <a class="collapsible-header waves-effect waves-blue"><i class="material-icons">work</i>Maestros</a>
            <div class="collapsible-body">
              <ul>
                {#maestros}
                  <li><a href="/{.}"><i class="material-icons">keyboard_arrow_right</i> {.}</a></li>
                {/maestros}
              </ul>
            </div>
          </li>
        </ul>
      </li>
      <div id="content-li">
        <li class="no-padding">
        <ul class="collapsible collapsible-accordion">
          <li>
            <a class="collapsible-header waves-effect waves-blue"><i class="material-icons">attach_money</i>Finanzas</a>
            <div class="collapsible-body">
              <ul>
                {#finanzas}
                  <li><a href="/{.}"><i class="material-icons">keyboard_arrow_right</i> {.}</a></li>
                {/finanzas}
              </ul>
            </div>
          </li>
        </ul>
      </li>
      {/dataPermissions}
    </div>
  </ul>
</div>
