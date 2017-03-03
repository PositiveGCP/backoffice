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

    {@iter obj=dataPermissions}
      <div id="content-li">
        <li class="no-padding">
          <ul class="collapsible collapsible-accordion">
            <li>
              <a class="collapsible-header waves-effect waves-blue">{$key}<i class="material-icons left">{$icon}</i><span class="badge new red">0</span></a>
              {@iter obj=$value}
                <div class="collapsible-body">
                  {#$value}
                  <ul>
                      <li><a href="/home/{.}">{.}<i class="material-icons left">keyboard_arrow_right</i></a></li>
                  </ul>
                  {/$value}
                </div>
              {/iter}
            </li>
          </ul>
        </li>
      </div> <!-- ./content-li -->
    {/iter}
  </ul>
</div>
