import "./ProfileField.css";

function ProfileField({
	name,
	labelText,
	placeholder,
	type,
	value,
	register,
	errors,
}) {
	return (
		<div className="field">
			<label htmlFor={name}>{labelText}</label>
			<input
				{...register(name)}
				id={name}
				placeholder={placeholder}
				type={type}
				value={value}
				disabled={name === "email"}
				className={name === "email" ? "disabled" : ""}
			/>
			<span className="error">{errors[name]?.message}</span>
		</div>
	);
}

export default ProfileField;
