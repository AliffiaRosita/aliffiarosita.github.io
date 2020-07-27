var base_url = "https://api.football-data.org/";

function status(response) {
    if (response.status !== 200) {
        console.log(`error ${response.status}`);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log(`Error ${error}`);
}
const fetchApi = function (url) {
    return fetch(url, {
        headers: {
            'X-Auth-Token': '97ba91665f0a409b87f2f336b23b0f6d'
        }
    });
};

function loadTeam(data) {
    var teamHTML = "";

    data.teams.forEach(function (team) {
        const jsonToStr = JSON.stringify(team);
        teamHTML += `
                            <div class="col s12 m4">
                            <div class="card horizontal">
                              <div class="card-stacked">
                                <div class="card-content">
                                    <div class="row">
                                        <div class="col m9 s9">
                                            <h5>${team.name}</h5>
                                            <p>${team.address}</p>
                                            <p><small>${team.email}</small></p>
                                        </div>
                                        <div class="col m3 s3">
                                                <a class="btn-floating btn-large waves-effect waves-light red"  onclick='favorite(${jsonToStr})'><i class="material-icons" >favorite</i></a>
                                        </div>
                                    </div>
                    
                                </div>
                              </div>
                            </div>
                          </div>
                            `;
    });

    document.getElementById("teams").innerHTML = teamHTML;

}

function loadMatch(matches) {
    
    document.getElementById("match-title").innerHTML = `${matches.competition.name} Schedule`;
    var matchHTML = "";
    matches.matches.forEach(match => {

        matchHTML += `
    <div class="col m6 s12">
<div class="card">
    <div class="card-content">
      <h5>${match.awayTeam.name} <strong>vs</strong> ${match.homeTeam.name}</h5>
      <p>date: ${match.season.startDate} until ${match.season.endDate}</p>
    </div>
  </div>
</div>
    `;
    });
    document.getElementById("matches").innerHTML = matchHTML;
}

function getTeam() {
    if ('caches' in window) {
        caches.match(`${base_url}v2/competitions/2001/teams`, {
            headers: {
                'X-Auth-Token': '97ba91665f0a409b87f2f336b23b0f6d'
            }
        }).then(function (response) {
            if (response) {
                response.json().then(loadTeam);
            }
        })
    }

    fetchApi(`${base_url}v2/competitions/2001/teams`).then(status)
        .then(json)
        .then(loadTeam).catch(error);

}

function getFavoriteTeam() {
    getAllTeam().then(teams => {
        var teamsHTML = "";

        if (teams.length === 0) {
            teamsHTML = `
            <img src="/empty.png" style="margin-left:auto;margin-right:auto;display:block" class="image-responsive alt="">
            <h5 style="text-align:center">You Have no Favorite Team</h5>
            `
        } else {
            
            console.log(teams);
            teams.forEach(team => {
                teamsHTML += `
                <div class="col s12 m4">
                <div class="card horizontal">
                  <div class="card-stacked">
                    <div class="card-content">
                        <div class="row">
                            <div class="col m9 s9">
                                <h5>${team.name}</h5>
                                <p>${team.address}</p>
                                <p>${team.email}</p>
                            </div>
                            <div class="col m3 s3">
                                     <a class="btn-floating btn-large waves-effect waves-light orange lighten-2" id="saved" onclick='deleteFavorite(${team.ID})'><i class="material-icons">delete</i></a>
                            </div>
                        </div>
        
                    </div>
                  </div>
                </div>
              </div>
                `;
            });
        }
        document.getElementById("favTeam").innerHTML = teamsHTML;

    });
}

function getMatch() {
    if ('caches' in window) {
        caches.match(`${base_url}v2/competitions/2001/matches?status=SCHEDULED`, {
            headers: {
                'X-Auth-Token': '97ba91665f0a409b87f2f336b23b0f6d'
            }
        }).then(response => {
            if (response) {
                response.json().then(loadMatch)
            }
        })
    }

    fetchApi(`${base_url}v2/competitions/2001/matches?status=SCHEDULED`)
        .then(status)
        .then(json)
        .then(loadMatch)
        .catch(error);
}