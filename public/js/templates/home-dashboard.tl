<!-- Dashboard -->
<div class="row">
  {@iter obj=.}
  <div class="col s3 m3 l3">
    <div class="card hoverable">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="{$value[0]}">
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4 truncate"><i class="material-icons right">more_vert</i>{$key}</span>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">{$key}<i class="material-icons right">close</i></span>
        <p>{$value[1]}</p>
      </div>
    </div>
  </div> <!-- col -->
  {/iter}
</div> <!-- row -->
