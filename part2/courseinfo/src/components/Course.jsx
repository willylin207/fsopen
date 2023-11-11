const Header = ({ course }) => {
    return <h2>{course}</h2>;
};

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part => (
                <Part key={part.id} part={part} />
            ))}
        </>
    );
};

const Total = ({ parts }) => {
    const total = parts.reduce((acc, currPart) => acc + currPart.exercises, 0)
    return <p>total of {total} exercises</p>;
};

const Part = ({ part }) => {
    return <p>{part.name} {part.exercises}</p>;
};

const Course = ({ course }) => (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
)

export default Course