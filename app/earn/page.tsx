"use client"

import { useEffect } from "react";
import { useEarnTasksStore } from "@/stores/earnTasks";
import api from "@/services/api";
import { Heading } from "@/components/Heading"
import { Content, Title } from "@/components/Kit"
import { CardEarn } from "./(components)/CardEarn"
import { Daily } from "./(components)/Daily"
import styles from "./earn.module.scss"

export default function Page() {
  const {tasks} = useEarnTasksStore()

  console.log(tasks)

  useEffect(() => {
    api.getEarnTasks()
  }, [])

  return (
    <Content>
      <Heading title="Earn More Points" txt="Complete tasks to earn points." />
      <Daily />
      <Title>Tasks List</Title>
      <div className={styles.list}>
        {tasks.map((task, index) => (
          <CardEarn key={index} task={task} />
        ))}
      </div>
    </Content>
  )
}
