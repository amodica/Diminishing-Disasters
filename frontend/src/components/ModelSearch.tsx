import TextField from "@mui/material/TextField";

export const ModelSearch = (setQ) => {
  const handleChange = (e) => {
    setQ(e.target.value);
  };
  return (
    <div className="centered">
      <TextField
        id="outlined-basic"
        variant="outlined"
        label="Search"
        onChange={handleChange}
      />
    </div>
  );
};
