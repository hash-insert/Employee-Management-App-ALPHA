import { useEffect, useState, useContext } from "react";
import { Modal, Button, message } from "antd";
import axios from "axios";
import { RerenderContext } from "../../context/ReRender";

export const Teams = ({ visible, handleTeamModal, id }) => {
  const [teams, setTeams] = useState([]);
  const { updateRender } = useContext(RerenderContext);

  const getAllTeams = async () => {
    try {
      const response = await axios.get(
        `https://server-sx5c.onrender.com/team/getAll/`
      );
      if (response.data.success) {
        var teamNames = response.data.teams.map((team) => team.teamName);
        setTeams(teamNames);
      }
    } catch (error) {
      console.log("error in getting all teams details", error);
    }
  };

  const handleAddToTeam = async (teamName, id) => {
    try {
      const response = await axios.put(
        `https://server-sx5c.onrender.com/team/updateTeam/`,
        {
          teamName,
          id,
        }
      );
      if (response.data.success) {
        message.success(response.data.msg);
        updateRender();
      } else {
        message.error(response.data.msg);
      }
      handleTeamModal();
    } catch (error) {
      console.log("error in adding user into team", error);
      handleTeamModal();
    }
  };

  const handleTeamModalCancel = () => {
    handleTeamModal();
  };

  useEffect(() => {
    getAllTeams();
  }, [updateRender]);

  return (
    <>
      <Modal
        title="Add to a Team"
        open={visible}
        onCancel={handleTeamModalCancel}
        footer={[]}
      >
        <div className="flex flex-wrap gap-2">
          {teams.map((team, index) => (
            <Button key={index} onClick={() => handleAddToTeam(team, id)}>
              {team}
            </Button>
          ))}
        </div>
      </Modal>
    </>
  );
};
