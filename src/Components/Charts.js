import React ,{useEffect} from 'react';
import { useSelector , useDispatch } from 'react-redux';
import {teams} from '../Redux/Actions/TeamList';
import {matches} from '../Redux/Actions/MatchList';
import { Table } from "react-bootstrap";
import { Bubble } from "react-chartjs-2";

const Charts=(props)=>{
	 const dispatch = useDispatch();
	  const matchList = useSelector(state =>state.matches?state.matches:[{rounds:[]}]);
	  const teamList = useSelector(state => state.teams&&state.teams?state.teams:[{clubs:[]}]);
	useEffect(() => {
			dispatch(teams());
			dispatch(matches());
	},[]);
	let teamCodes = [];
    let output = { clubs: [] };
    if (teamList && teamList.clubs) {
      teamCodes = teamList.clubs.map(e => e["name"]);
      teamCodes.map(e => output.clubs.push({ name: e }));
    }
    if (matchList && matchList.rounds) {
      matchList.rounds.forEach((data, index) => {
        data.matches.map(ef => {
          teamCodes.forEach((e, index) => {
            var codeIndex = output.clubs.findIndex(function(
              element,  
              index, 
              array
            ) {
              return element.name === e;
            }); 
            if (ef.team1.name == e) {
              var totalMatch = output.clubs[codeIndex].total_matches? Number(output.clubs[codeIndex].total_matches): 0;  
              var totalGoals = output.clubs[codeIndex].total_goals? Number(output.clubs[codeIndex].total_goals): 0;
              var AgainstGoals = output.clubs[codeIndex].against_goals? Number(output.clubs[codeIndex].against_goals)
                : 0;
              var totalWon = output.clubs[codeIndex].won
                ? Number(output.clubs[codeIndex].won)
                : 0;
              var totalLost = output.clubs[codeIndex].lost
                ? Number(output.clubs[codeIndex].lost)
                : 0;
              var totalTie = output.clubs[codeIndex].tie
                ? Number(output.clubs[codeIndex].tie)
                : 0;
              output.clubs[codeIndex].code = ef.team1.code;
              output.clubs[codeIndex].name = e;
              output.clubs[codeIndex].key = ef.team1.key;
              output.clubs[codeIndex].total_matches = totalMatch + 1;
              output.clubs[codeIndex].total_goals = totalGoals + ef.score1;
              output.clubs[codeIndex].against_goals = AgainstGoals + ef.score2;
              if (ef.score1 > ef.score2) {
                output.clubs[codeIndex].won = totalWon + 1;
              } else if (ef.score1 < ef.score2) {
                output.clubs[codeIndex].lost = totalLost + 1;
              } else {
                output.clubs[codeIndex].tie = totalTie + 1;
              }
            } else if (ef.team2.name == e) {
              var totalMatch = output.clubs[codeIndex].total_matches
                ? Number(output.clubs[codeIndex].total_matches)
                : 0;
              var totalGoals = output.clubs[codeIndex].total_goals
                ? Number(output.clubs[codeIndex].total_goals)
                : 0;
              var AgainstGoals = output.clubs[codeIndex].against_goals
                ? Number(output.clubs[codeIndex].against_goals)
                : 0;
              var totalWon = output.clubs[codeIndex].won
                ? Number(output.clubs[codeIndex].won)
                : 0;
              var totalLost = output.clubs[codeIndex].lost
                ? Number(output.clubs[codeIndex].lost)
                : 0;
              var totalTie = output.clubs[codeIndex].tie
                ? Number(output.clubs[codeIndex].tie)
                : 0;
              output.clubs[codeIndex].code = ef.team2.code;
              output.clubs[codeIndex].name = e;
              output.clubs[codeIndex].key = ef.team2.key;
              output.clubs[codeIndex].total_matches = totalMatch + 1;
              output.clubs[codeIndex].total_goals = totalGoals + ef.score2;
              output.clubs[codeIndex].against_goals = AgainstGoals + ef.score1;
              if (ef.score1 > ef.score2) {
                output.clubs[codeIndex].won = totalWon + 1;
              } else if (ef.score1 < ef.score2) {
                output.clubs[codeIndex].lost = totalLost + 1;
              } else {
                output.clubs[codeIndex].tie = totalTie + 1;
              }
            }
          });
        });
      });
    }
    var MatchTableData = [];
    if (output) {
      output.clubs.forEach((object, index) => {
        if(object.code)
        MatchTableData.push(
          <tr>
            <td>{object.code}</td>
            <td>{object.total_matches}</td>
            <td>{object.won}</td>
            <td>{object.lost}</td>
            <td>{object.tie}</td>
            <td>{object.total_goals}</td>
            <td>{object.against_goals}</td>
          </tr>
        );
      });
    }
    var colorSet = [
      "#673ab7",
      "#3f51b5",
      "#ff3752",
      "#607d8b",
      "#9e9e9e",
      "#795548",
      "#ff5722",
      "#ff9800",
      "#ffc107",
      "#cddc39",
      "#8bc34a",
      "#4caf50",
      "#009688",
      "#1D0A18",
      "#ff6384",
      "#009688",
      "#f44336",
      "#e91e63",
      "#9c27b0",
      "#ff0404"
    ];
    var dataSets = [];

    if (output) {
      output.clubs.forEach((object, index) => {
        var dataobj = {
          label: object.name,
          data: [
            {
              x: object.lost,
              y: object.won,
              r: object.total_goals
            }
          ],
          backgroundColor: colorSet[index],
          hoverBackgroundColor: colorSet[index]
        };
        dataSets.push(dataobj);
      });
    }
    const bubbleChartdata = {
      datasets: dataSets
    };
	return (
            <div className='chart'>
            	<Bubble data={bubbleChartdata} />
            	 <Table striped bordered hover className="table-data">
          <thead>
            <tr>
              <th>Teams</th>
              <th>Total Matches</th>
              <th>Won</th>
              <th>Lost</th>
              <th>Ties</th>
              <th>Total Goal Score For</th>
              <th>Total Goal Score Against</th>
            </tr>
          </thead>
          <tbody>{MatchTableData}</tbody>
        </Table>
            </div>
		 )
}

export default Charts;