"use client"

import { useState } from "react"
import { allSkills } from "../data/skills"

export function useSkills(initialSkills?) {
    const initialSkillsState = allSkills.reduce((acc, skill) => {
        acc[skill.nome] = {
        atributo: skill.select
        ? skill.select[0]
        : skill.atributo,

        treinada: false
        };

        return acc;
    }, {});

    const [skillsState, setSkillsState] = useState(initialSkills ? initialSkills.pericias : initialSkillsState);

    function updateSkillAttribute(skillName, value) {
    setSkillsState(prev => ({
      ...prev,

      [skillName]: {
        ...prev[skillName],
        atributo: value
      }
    }))
  }

  function updateSkillTraining(skillName, value) {
    setSkillsState(prev => ({
      ...prev,

      [skillName]: {
        ...prev[skillName],
        treinada: value
      }
    }))
  }

  return {
    skillsState,
    updateSkillAttribute,
    updateSkillTraining,
  }

}