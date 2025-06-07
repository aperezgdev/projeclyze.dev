import { Logger } from '@projeclyze/context/Shared/domain/Logger'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { ProjectFinder } from '../domain/ProjectFinder'
import { ProjectRepository } from '../domain/ProjectRepository'

export class ProjectRemover {
  constructor(
    private repository: ProjectRepository,
    private finder: ProjectFinder,
    private logger: Logger
  ) {
    this.finder = new ProjectFinder(repository, logger)
  }

  async run({ id }: { id: string }): Promise<void> {
    await this.finder.run({ id })

    this.logger.log(`Removing project with id: ${id}`)
    return await this.repository.delete(new Uuidv7(id))
  }
}
