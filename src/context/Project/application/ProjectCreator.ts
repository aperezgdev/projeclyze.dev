import { Project } from '../domain/Project'
import { ProjectRepository } from '../domain/ProjectRepository'

export class ProjectCreator {
  constructor(private repository: ProjectRepository) {}

  async run({
    title,
    description,
    owner,
  }: {
    title: string
    description: string
    owner: string
  }): Promise<void> {
    const project = Project.create(title, description, owner)

    return this.repository.save(project)
  }
}
