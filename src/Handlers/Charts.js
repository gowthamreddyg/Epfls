
let charts ={
	getTeamsCode:getTeamsCode
}

function getTeamsCode(teamlist){
	let teamCodes = [];
    let output = { clubs: [] };
    if (teamlist) {
      teamCodes = teamlist.clubs.map(e => e["name"]);
      teamCodes.map(e => output.clubs.push({ name: e }));
    }
    return teamCodes;
}
