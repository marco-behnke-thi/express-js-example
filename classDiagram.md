classDiagram
direction LR

%% =========================
%% Domain Layer (Aggregates)
%% =========================

class Alliance <<AggregateRoot>> {
  +AllianceId id
  +String name
  +AllianceStatus status
  +int maxMembers
  +bool isOpen
  +canJoin(userId: UserId) bool
}

class User <<AggregateRoot>> {
  +UserId id
  +String displayName
  +UserStatus status
}

class Membership <<AggregateRoot>> {
  +MembershipId id
  +AllianceId allianceId
  +UserId userId
  +MembershipStatus status
  +join()
  +leave()
}

%% =========================
%% Commands (Write side)
%% =========================

class JoinAlliance <<Command>> {
  +AllianceId allianceId
  +UserId userId
}

class LeaveAlliance <<Command>> {
  +AllianceId allianceId
  +UserId userId
}

%% =========================
%% Domain Events
%% =========================

class UserJoinedAlliance <<DomainEvent>> {
  +AllianceId allianceId
  +UserId userId
  +DateTime occurredAt
}

class UserLeftAlliance <<DomainEvent>> {
  +AllianceId allianceId
  +UserId userId
  +DateTime occurredAt
}

%% =========================
%% Application Layer
%% =========================

class JoinAllianceHandler {
  +handle(cmd: JoinAlliance)
}

class LeaveAllianceHandler {
  +handle(cmd: LeaveAlliance)
}

class AllianceRepository {
  +load(id: AllianceId) Alliance
}

class UserRepository {
  +load(id: UserId) User
}

class MembershipRepository {
  +findByUser(userId: UserId) Membership?
  +find(allianceId: AllianceId, userId: UserId) Membership?
  +save(m: Membership)
  +delete(m: Membership)
}

%% =========================
%% Query Side (Read model)
%% =========================

class GetAllianceMembers <<Query>> {
  +AllianceId allianceId
}

class AllianceMembersDto <<DTO>> {
  +AllianceId allianceId
  +String allianceName
  +MemberDto[] members
}

class MemberDto <<DTO>> {
  +UserId userId
  +String displayName
  +String role
}

class GetAllianceMembersHandler {
  +handle(q: GetAllianceMembers) AllianceMembersDto
}

class ReadModelDB <<ReadStore>> {
  +alliances_view
  +alliance_members_view
  +users_view
}

%% =========================
%% Relationships
%% =========================

JoinAllianceHandler --> JoinAlliance
LeaveAllianceHandler --> LeaveAlliance

JoinAllianceHandler --> AllianceRepository
JoinAllianceHandler --> UserRepository
JoinAllianceHandler --> MembershipRepository

LeaveAllianceHandler --> MembershipRepository
LeaveAllianceHandler --> AllianceRepository

Membership --> Alliance : references (id)
Membership --> User : references (id)

Membership ..> UserJoinedAlliance : emits
Membership ..> UserLeftAlliance : emits

GetAllianceMembersHandler --> GetAllianceMembers
GetAllianceMembersHandler --> ReadModelDB
GetAllianceMembersHandler --> AllianceMembersDto
AllianceMembersDto --> MemberDto
