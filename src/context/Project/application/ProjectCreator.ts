import { Project } from '../domain/Project'
import { ProjectRepository } from '../domain/ProjectRepository'

export class ProjectCreator {
  constructor(private repository: ProjectRepository) {}

  async run(title: string, description: string, creator: string): Promise<void> {
    const project = Project.create(title, description, creator)

    return this.repository.save(project)
  }
}
