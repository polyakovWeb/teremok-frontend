function TaskInput({ name, type, register, className, min, max, curTask }) {
	return (
		<>
			<input
				className={className}
				{...register(name)}
				name={name}
				type={type}
				placeholder={"?"}
				min={min}
				max={max}
				disabled={curTask[name] === null ? false : true}
				required
			/>
		</>
	);
}

export default TaskInput;
