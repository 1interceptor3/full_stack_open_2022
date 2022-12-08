const Header = ({ course }) => <h1>{course.name}</h1>

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ course }) =>
    <div>
        {course.parts.map(part =>
            <Part key={part.id} part={part}/>
        )}
        <p style={{fontWeight: "bold"}}>
            total of {
            course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
        } exercises
        </p>
    </div>

const Course = ({course}) => {
    return (
        <div>
            <Header course={course}/>
            <Content course={course}/>
        </div>
    )
}

export default Course;