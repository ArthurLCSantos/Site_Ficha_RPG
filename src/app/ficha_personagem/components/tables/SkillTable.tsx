export default function SkillTable({ skills, skillsState, updateSkillAttribute, updateSkillTraining }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse text-sm md:text-base">
        <tbody>
          {skills.map((skill, index) => (
            <tr
              key={index}
              className="border-b border-gray-300"
            >
              <td className="py-2 pr-3 text-left">{skill.nome}</td>

              <td className="py-2 text-left">
                {skill.select ? (
                  <select
                  value={skillsState[skill.nome].atributos}
                  onChange={(e)=>updateSkillAttribute(skill.nome, e.target.value)}
                  >
                    {skill.select.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <p>{skill.atributo}</p>
                )}
              </td>

              <td className="py-2 text-center">
                <input
                className="size-8"
                checked={skillsState[skill.nome].treinada}
                onChange={(e)=>updateSkillTraining(skill.nome, e.target.checked)}
                type="checkbox" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}