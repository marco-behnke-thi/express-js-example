´´´mermaid
sequenceDiagram
autonumber
actor UI as UI (Player)
participant Q as Query API
participant RM as Read Model / DB
participant C as Command API
participant H as JoinAllianceHandler
participant AR as AllianceRepository
participant UR as UserRepository
participant MR as MembershipRepository
participant E as Domain Event Bus
participant P as Projection (Read Model Updater)

UI->>Q: GetAllianceMembers(allianceId)
Q->>RM: SELECT members for allianceId
RM-->>Q: AllianceMembersDto(members[])
Q-->>UI: members[] shown

UI->>C: JoinAlliance(allianceId, userId)
C->>H: handle(command)

H->>AR: load(allianceId)
AR-->>H: Alliance
H->>UR: load(userId)
UR-->>H: User

H->>MR: find(allianceId, userId)
MR-->>H: Membership? (none)

H->>MR: save(new Membership.join())
MR-->>H: saved

H-->>E: publish(UserJoinedAlliance)
E-->>P: on(UserJoinedAlliance)
P->>RM: update alliance_members_view

UI->>Q: GetAllianceMembers(allianceId)  (refresh)
Q->>RM: SELECT members for allianceId
RM-->>Q: updated AllianceMembersDto
Q-->>UI: list includes new member
´´´
