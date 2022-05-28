export const handleChange = (e, setter) => {
  setter((details) => ({ ...details, [e.target.name]: e.target.value }));
};
