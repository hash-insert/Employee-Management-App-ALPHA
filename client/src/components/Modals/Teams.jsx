import { useState } from "react";
import { Modal, Button, message } from "antd";

export const Teams = ({ visible, handleTeam }) => {
  const teamColors = ["red", "blue", "green", "purple"];
  const [teams, setTeams] = useState(["team1", "team2", "team3", "team4"]);

  const handleAddToTeam = (team) => {
    message.success(`Added to ${team} succesfully`);
    handleTeam();
  };

  const handleTeamModalCancel = () => {
    handleTeam();
  };

  return (
    <Modal
      title="Add to a Team"
      open={visible}
      onCancel={handleTeamModalCancel}
      footer={[]}
      okButtonProps={{
        style: { backgroundColor: "blue", borderColor: "blue" },
      }}
    >
      <div className="flex flex-wrap gap-2">
        {teams.map((team, index) => (
          <Button
            key={index}
            style={{
              backgroundColor: teamColors[index],
              color: "white",
            }}
            onClick={() => handleAddToTeam(team)}
          >
            {team}
          </Button>
        ))}
      </div>
    </Modal>
  );
};
