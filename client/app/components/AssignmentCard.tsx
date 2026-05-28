interface Props {

  id: string;

  title: string;

  assignedDate: string;

  dueDate: string;

}

export default function AssignmentCard({

  id,

  title,

  assignedDate,

  dueDate,

}: Props) {

  return (

    <a
      href={`/assignment/${id}`}
      className="
        block
        bg-white
        rounded-2xl
        shadow-sm
        p-5
        hover:shadow-xl
        transition
      "
    >

      <h2 className="text-xl font-semibold">

        {title}

      </h2>

      <div className="flex justify-between mt-6 text-sm text-gray-500">

        <p>

          Assigned on:
          {" "}
          {assignedDate}

        </p>

        <p>

          Due:
          {" "}
          {dueDate}

        </p>

      </div>

    </a>

  );

}