import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { ProjectFinder } from '../domain/ProjectFinder'
import { ProjectRepository } from '../domain/ProjectRepository'

export class ProjectRemover {
  constructor(
    private repository: ProjectRepository,
    private finder: ProjectFinder,
  ) {
    this.finder = new ProjectFinder(repository)
  }

  async run(id: string): Promise<void> {
    await this.finder.run({ id })

    return this.repository.delete(new Uuidv7(id))
  }
}
