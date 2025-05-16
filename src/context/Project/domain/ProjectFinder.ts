import { NotExistError } from '../../Shared/domain/NotExistError'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { Project } from './Project'
import { ProjectRepository } from './ProjectRepository'

export class ProjectFinder {
  constructor(private repository: ProjectRepository) {}

  async run({ id }: { id: string }): Promise<Project> {
    const projectId = new Uuidv7(id)

    const project = await this.repository.findById(projectId)
    if (!project.isPresent()) {
      throw new NotExistError(`Project with id ${id} not found`)
    }

    return project.get()
  }
}
