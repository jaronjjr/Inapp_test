const note = (sequelize, DataTypes) => {
    const Note = sequelize.define("note", {
      id: {
        type: DataTypes.TEXT,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      date: {
        type: DataTypes.DATE
      }
    });
  
    return Note;
  };
  
  export default note;
  