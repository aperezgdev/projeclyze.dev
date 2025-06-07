import { Logger } from '@projeclyze/context/Shared/domain/Logger'
import { Project } from '../domain/Project'
import { ProjectRepository } from '../domain/ProjectRepository'

export class ProjectCreator {
  constructor(private repository: ProjectRepository, private logger: Logger) {}

  async run({
    title,
    description,
    owner,
  }: {
    title: string
    description: string
    owner: string
  }): Promise<void> {
    this.logger.log(`Creating project with title: ${title}, description: ${description}, owner: ${owner}`)
    const project = Project.create(title, description, owner)

    return await this.repository.save(project)
  }
}
